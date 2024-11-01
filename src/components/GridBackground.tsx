import React, { useMemo } from 'react';
import { Theme } from '../types/theme';
import { Position } from '../types/workflow';

interface GridBackgroundProps {
  theme: Theme;
  scale: number;
  offset: Position;
  viewportWidth: number;
  viewportHeight: number;
}

export const GridBackground: React.FC<GridBackgroundProps> = React.memo(({
  theme,
  scale,
  offset,
  viewportWidth,
  viewportHeight,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Calculate grid parameters based on scale
  const gridParams = useMemo(() => {
    const baseGridSize = 20;
    const majorGridSize = baseGridSize * 5;
    
    return {
      minorGridSize: baseGridSize,
      majorGridSize,
      minorOpacity: Math.min(0.5, 0.5 / (scale * 0.5)),
      majorOpacity: Math.min(1, 1 / (scale * 0.5)),
      minorWidth: scale < 0.7 ? 0 : 1,
      majorWidth: 1,
    };
  }, [scale]);

  // Draw grid using Canvas API for better performance
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match viewport
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Clear canvas
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    const { minorGridSize, majorGridSize, minorOpacity, majorOpacity, minorWidth, majorWidth } = gridParams;

    // Calculate visible grid area
    const startX = Math.floor((-offset.x) / minorGridSize) * minorGridSize;
    const startY = Math.floor((-offset.y) / minorGridSize) * minorGridSize;
    const endX = Math.ceil((viewportWidth - offset.x) / minorGridSize) * minorGridSize;
    const endY = Math.ceil((viewportHeight - offset.y) / minorGridSize) * minorGridSize;

    ctx.save();
    ctx.translate(offset.x, offset.y);

    // Draw minor grid lines
    if (minorWidth > 0) {
      ctx.beginPath();
      ctx.strokeStyle = theme.colors.gridPrimary;
      ctx.globalAlpha = minorOpacity;
      ctx.lineWidth = minorWidth;

      for (let x = startX; x <= endX; x += minorGridSize) {
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
      }

      for (let y = startY; y <= endY; y += minorGridSize) {
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
      }

      ctx.stroke();
    }

    // Draw major grid lines
    ctx.beginPath();
    ctx.strokeStyle = theme.colors.gridSecondary;
    ctx.globalAlpha = majorOpacity;
    ctx.lineWidth = majorWidth;

    for (let x = startX; x <= endX; x += majorGridSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }

    for (let y = startY; y <= endY; y += majorGridSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }

    ctx.stroke();
    ctx.restore();

  }, [offset, scale, viewportWidth, viewportHeight, theme.colors, gridParams]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundColor: theme.colors.canvas,
        width: viewportWidth,
        height: viewportHeight,
      }}
    />
  );
});

GridBackground.displayName = 'GridBackground';