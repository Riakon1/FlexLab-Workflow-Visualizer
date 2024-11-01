import React, { useState, useCallback } from 'react';
import { Note } from '../types/workflow';
import { X } from 'lucide-react';
import { Theme } from '../types/theme';

interface NoteProps {
  note: Note;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onChange: (text: string) => void;
  onDelete: (id: string) => void;
}

export const NoteComponent: React.FC<NoteProps> = ({
  note,
  selected,
  theme,
  onMouseDown,
  onChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    // If note is empty after editing, delete it
    if (!note.text.trim()) {
      onDelete(note.id);
    }
  }, [note.id, note.text, onDelete]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }, []);

  return (
    <div
      className="absolute min-w-[200px] min-h-[120px] max-w-[400px] transition-all duration-200"
      style={{
        left: note.position.x,
        top: note.position.y,
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <textarea
          className="w-full h-full p-4 resize-none focus:outline-none focus:ring-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, #ffd93d 0%, #ffd42a 100%)`,
            border: 'none',
            color: '#000',
            minHeight: '120px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          value={note.text}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Enter note text..."
          autoFocus
        />
      ) : (
        <div 
          className="relative w-full h-full p-4 rounded-lg transition-transform hover:-translate-y-0.5 hover:rotate-1"
          style={{
            background: `linear-gradient(135deg, #ffd93d 0%, #ffd42a 100%)`,
            boxShadow: `
              0 1px 2px rgba(0, 0, 0, 0.1),
              0 2px 4px rgba(0, 0, 0, 0.1),
              0 4px 8px rgba(0, 0, 0, 0.1),
              0 8px 16px rgba(0, 0, 0, 0.1)
            `,
            transform: selected ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {/* Delete button */}
          {isHovered && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 hover:scale-110 z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Note content */}
          <div className="w-full h-full whitespace-pre-wrap break-words text-gray-800">
            {note.text || (
              <span className="text-gray-600 italic">
                Double click to edit note...
              </span>
            )}
          </div>

          {/* Bottom fold effect */}
          <div 
            className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              background: 'linear-gradient(-45deg, rgba(0,0,0,0.1) 50%, transparent 50%)',
              borderBottomRightRadius: '0.5rem',
            }}
          />
        </div>
      )}
    </div>
  );
};