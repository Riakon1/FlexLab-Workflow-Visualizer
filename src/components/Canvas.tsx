import React, { useState, useCallback, useEffect } from 'react';
import { NodeComponent } from './nodes/NodeComponent';
import { ConnectionLine } from './ConnectionLine';
import { useCanvasControls } from '../hooks/useCanvasControls';
import { GridBackground } from './GridBackground';
import { Theme } from '../types/theme';
import { Node, Connection, Position } from '../types/nodes';

interface CanvasProps {
  nodes: Node[];
  connections: Connection[];
  selected: string | null;
  theme: Theme;
  scale: number;
  offset: Position;
  connectionMode: { active: boolean; sourceId: string | null };
  onNodeMove: (id: string, position: Position) => void;
  onSelect: (id: string | null) => void;
  onDeleteNode: (id: string) => void;
  onDeleteConnection: (id: string) => void;
  onNodeClick: (id: string) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  connections,
  selected,
  theme,
  onNodeMove,
  onSelect,
  onDeleteNode,
  onDeleteConnection,
  onNodeClick,
  connectionMode
}) => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [dragState, setDragState] = useState<{
    id: string;
    startPos: Position;
    nodeStartPos: Position;
  } | null>(null);

  const {
    containerRef,
    scale,
    offset,
    isDragging,
  } = useCanvasControls({
    minScale: 0.1,
    maxScale: 5,
    inertiaEnabled: true,
    isObjectDragging: dragState !== null,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      setViewportSize({
        width: containerRef.current?.clientWidth || 0,
        height: containerRef.current?.clientHeight || 0,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const getScaledPosition = useCallback((clientX: number, clientY: number): Position => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - offset.x) / scale,
      y: (clientY - rect.top - offset.y) / scale,
    };
  }, [offset, scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const node = nodes.find(n => n.id === id);
    if (!node) return;

    const mousePos = getScaledPosition(e.clientX, e.clientY);
    setDragState({
      id,
      startPos: mousePos,
      nodeStartPos: { ...node.position },
    });
    onSelect(id);
  }, [nodes, getScaledPosition, onSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState) return;

    const currentPos = getScaledPosition(e.clientX, e.clientY);
    const deltaX = currentPos.x - dragState.startPos.x;
    const deltaY = currentPos.y - dragState.startPos.y;

    onNodeMove(dragState.id, {
      x: dragState.nodeStartPos.x + deltaX,
      y: dragState.nodeStartPos.y + deltaY,
    });
  }, [dragState, getScaledPosition, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden select-none relative bg-gray-900"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <GridBackground
        theme={theme}
        scale={scale}
        offset={offset}
        viewportWidth={viewportSize.width}
        viewportHeight={viewportSize.height}
      />

      <div
        className="absolute inset-0 transform-gpu"
        style={{
          transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
          transformOrigin: '0 0',
        }}
      >
        {connections.map(connection => (
          <ConnectionLine
            key={connection.id}
            connection={connection}
            selected={selected === connection.id}
            onDelete={onDeleteConnection}
            onClick={() => onSelect(connection.id)}
            theme={theme}
          />
        ))}

        {nodes.map(node => (
          <NodeComponent
            key={node.id}
            node={node}
            selected={selected === node.id}
            theme={theme}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
            onStartConnection={() => {}}
            onCompleteConnection={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

Canvas.displayName = 'Canvas';