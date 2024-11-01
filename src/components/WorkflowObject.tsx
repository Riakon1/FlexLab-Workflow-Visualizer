import React, { useState, useCallback, useRef } from 'react';
import { WorkflowObject } from '../types/workflow';
import { Theme } from '../types/theme';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';

interface WorkflowObjectProps {
  object: WorkflowObject;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
}

const MIN_WIDTH = 200;
const MIN_HEIGHT = 120;

export const WorkflowObjectComponent: React.FC<WorkflowObjectProps> = ({
  object,
  selected,
  theme,
  onMouseDown,
  onClick,
  onResize,
  onDelete,
  onEdit,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  // Get icon component dynamically
  const IconComponent = (Icons as any)[object.icon] || Icons.Box;

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: object.size.width,
      height: object.size.height
    };
    
    setIsResizing(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStartRef.current) return;

      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      
      const newWidth = Math.max(MIN_WIDTH, resizeStartRef.current.width + deltaX);
      const newHeight = Math.max(MIN_HEIGHT, resizeStartRef.current.height + deltaY);
      
      onResize(object.id, newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [object.id, object.size.width, object.size.height, onResize]);

  return (
    <div
      className={`absolute rounded-xl overflow-hidden transition-all duration-200 ${
        selected ? 'ring-1 ring-blue-500/50' : ''
      }`}
      style={{
        left: object.position.x,
        top: object.position.y,
        width: object.size.width,
        height: object.size.height,
        background: `linear-gradient(180deg, ${theme.colors.objectBackground}05 0%, ${theme.colors.objectBackground} 100%)`,
        border: `1px solid ${theme.colors.objectBorder}`,
        color: theme.colors.objectText,
        boxShadow: `
          0 1px 2px rgba(0, 0, 0, 0.1),
          0 2px 4px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(0, 0, 0, 0.1)
        `,
        transform: selected ? 'scale(1.005)' : 'scale(1)',
        zIndex: isResizing ? 1000 : 1,
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5" />
          <span className="font-medium">{object.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status indicator */}
          <div className={`w-2 h-2 rounded-full ${
            object.status === 'active' ? 'bg-green-500' :
            object.status === 'warning' ? 'bg-yellow-500' :
            object.status === 'error' ? 'bg-red-500' :
            'bg-gray-500'
          }`} />

          {/* Delete button */}
          {isHovered && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(object.id);
              }}
              className="p-1 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-gray-300">
        {object.description || 'Double click to edit description'}
      </div>

      {/* Resize handle */}
      {selected && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleResizeStart}
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${theme.colors.objectBorder} 50%)`,
          }}
        />
      )}
    </div>
  );
};