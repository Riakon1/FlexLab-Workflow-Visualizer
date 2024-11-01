import React, { useState, useRef, useEffect } from 'react';
import { X, Edit2, Maximize2, Trash2 } from 'lucide-react';
import { Theme } from '../types/theme';
import { WorkflowObject } from '../types/workflow';

interface ObjectOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  object: WorkflowObject;
  onEdit: (id: string, label: string) => void;
  onDelete: (id: string) => void;
  onStartResize: () => void;
  theme: Theme;
  position?: { x: number, y: number };
}

export const ObjectOptionsModal: React.FC<ObjectOptionsModalProps> = ({
  isOpen,
  onClose,
  object,
  onEdit,
  onDelete,
  onStartResize,
  theme,
  position
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(object.label);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (label.trim()) {
      onEdit(object.id, label);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setLabel(object.label);
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute z-50 min-w-[200px]"
      style={{
        top: position?.y || '50%',
        left: position?.x || '50%',
        transform: 'translate(-50%, -50%)',
        background: theme.colors.modalBackground,
        borderRadius: theme.spacing.objectBorderRadius,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="p-2 space-y-1">
        {isEditing ? (
          <div className="px-2 py-1">
            <input
              ref={inputRef}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-200 hover:bg-white/10 rounded transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Label
            </button>
            <button
              onClick={onStartResize}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-200 hover:bg-white/10 rounded transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              Resize
            </button>
            <button
              onClick={() => onDelete(object.id)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};