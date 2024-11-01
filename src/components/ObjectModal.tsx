import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Theme } from '../types/theme';

interface ObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: string, title: string, icon: string) => void;
  theme: Theme;
}

export const ObjectModal: React.FC<ObjectModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  theme
}) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Box');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out non-icon exports and match search term
  const iconList = Object.keys(Icons).filter(key => {
    const value = (Icons as any)[key];
    return typeof value === 'function' && 
           key !== 'createLucideIcon' && 
           key.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAdd = () => {
    if (title) {
      onAdd('custom', title, selectedIcon);
      setTitle('');
      setSelectedIcon('Box');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ background: theme.colors.modalBackground }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Add Object</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
              placeholder="Enter object title"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Icon
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
              placeholder="Search icons..."
            />
            
            <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
              {iconList.map(iconName => {
                const IconComponent = (Icons as any)[iconName];
                return (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className={`aspect-square p-2 rounded-lg flex items-center justify-center transition-all ${
                      selectedIcon === iconName
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
                    }`}
                    title={iconName}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!title}
            className={`px-4 py-2 text-sm text-white rounded-lg flex items-center gap-2 ${
              title ? 'bg-blue-500 hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Object
          </button>
        </div>
      </div>
    </div>
  );
};