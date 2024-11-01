import { useState, useCallback, useRef, useEffect } from 'react';
import { Position } from '../types/nodes';

interface UseCanvasControlsProps {
  minScale?: number;
  maxScale?: number;
  inertiaEnabled?: boolean;
  isObjectDragging?: boolean;
}

interface CanvasState {
  scale: number;
  offset: Position;
  isDragging: boolean;
}

const ZOOM_SENSITIVITY = 0.0015;

export function useCanvasControls({
  minScale = 0.1,
  maxScale = 5,
  inertiaEnabled = true,
  isObjectDragging = false,
}: UseCanvasControlsProps = {}) {
  const [state, setState] = useState<CanvasState>({
    scale: 1,
    offset: { x: 0, y: 0 },
    isDragging: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef<Position>({ x: 0, y: 0 });

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setState(prev => {
      const scaleDelta = 1 - event.deltaY * ZOOM_SENSITIVITY;
      const newScale = Math.min(maxScale, Math.max(minScale, prev.scale * scaleDelta));
      const scaleRatio = newScale / prev.scale;

      const worldX = (mouseX - prev.offset.x) / prev.scale;
      const worldY = (mouseY - prev.offset.y) / prev.scale;

      return {
        ...prev,
        scale: newScale,
        offset: {
          x: mouseX - worldX * newScale,
          y: mouseY - worldY * newScale,
        },
        isDragging: false,
      };
    });
  }, [minScale, maxScale]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (event.button !== 0 || isObjectDragging) return;

    event.preventDefault();
    lastMousePosition.current = { x: event.clientX, y: event.clientY };

    setState(prev => ({
      ...prev,
      isDragging: true,
    }));
  }, [isObjectDragging]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!state.isDragging) return;

    setState(prev => ({
      ...prev,
      offset: {
        x: prev.offset.x + (event.clientX - lastMousePosition.current.x),
        y: prev.offset.y + (event.clientY - lastMousePosition.current.y),
      },
    }));

    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  }, [state.isDragging]);

  const handleMouseUp = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  return {
    containerRef,
    scale: state.scale,
    offset: state.offset,
    isDragging: state.isDragging,
  };
}