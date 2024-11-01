import React, { useState, useCallback } from 'react';
import { Node } from '../../types/nodes';
import { Theme } from '../../types/theme';
import * as Icons from 'lucide-react';

interface BaseNodeProps {
  node: Node;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize?: (id: string, width: number, height: number) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, label: string) => void;
}

export const BaseNodeComponent: React.FC<BaseNodeProps> = ({
  node,
  selected,
  theme,
  onMouseDown,
  onClick,
  onResize,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEdit) {
      onEdit(node.id, editLabel);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditLabel(node.label);
      setIsEditing(false);
    }
  }, [node.id, node.label, editLabel, onEdit]);

  const handleBlur = useCallback(() => {
    if (onEdit) {
      onEdit(node.id, editLabel);
    }
    setIsEditing(false);
  }, [node.id, editLabel, onEdit]);

  const IconComponent = Icons[node.type as keyof typeof Icons] || Icons.Box;

  return (
    <div
      className={`absolute cursor-move rounded-lg transition-shadow duration-200 ${
        selected ? 'ring-2 ring-blue-400 shadow-lg' : ''
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
        background: node.style.backgroundColor,
        border: `1px solid ${node.style.borderColor}`,
        boxShadow: `0 4px 6px ${node.style.shadowColor}`,
        color: node.style.textColor,
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5" style={{ color: node.style.iconColor }} />
          {isEditing ? (
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="bg-transparent border-none outline-none focus:ring-0"
              autoFocus
            />
          ) : (
            <div onDoubleClick={handleDoubleClick}>{node.label}</div>
          )}
        </div>
        {selected && onDelete && (
          <button
            onClick={() => onDelete(node.id)}
            className="p-1 text-gray-400 hover:text-red-400 rounded"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Connection Points */}
      {node.connectionPoints?.map((point) => (
        <div
          key={point.id}
          className="absolute w-3 h-3 bg-blue-500 rounded-full"
          style={{
            left: point.position === 'left' ? -6 : 
                  point.position === 'right' ? node.size.width - 6 : 
                  (node.size.width * point.x) - 6,
            top: point.position === 'top' ? -6 : 
                 point.position === 'bottom' ? node.size.height - 6 : 
                 (node.size.height * point.y) - 6,
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

BaseNodeComponent.displayName = 'BaseNodeComponent';