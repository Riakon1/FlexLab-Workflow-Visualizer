import React from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types/theme';
import { predefinedThemes } from '../utils/themeStorage';
import { ThemePreview } from './ThemePreview';

interface ThemeCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  theme: Theme;
}

export const ThemeCustomizationModal: React.FC<ThemeCustomizationModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  theme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div 
        className="w-full max-w-4xl h-[calc(100vh-4rem)] rounded-xl flex flex-col"
        style={{ background: theme.colors.modalBackground }}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Select Theme</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predefinedThemes.map(presetTheme => (
              <div
                key={presetTheme.id}
                className={`group relative rounded-lg overflow-hidden border-2 transition-colors cursor-pointer hover:scale-[1.02] transform duration-200 ${
                  currentTheme.id === presetTheme.id
                    ? 'border-blue-500 ring-2 ring-blue-500/50'
                    : 'border-transparent hover:border-gray-700'
                }`}
                onClick={() => onThemeChange(presetTheme)}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                <div className="relative p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{presetTheme.name}</h3>
                    {currentTheme.id === presetTheme.id && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <ThemePreview theme={presetTheme} />

                  <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        currentTheme.id === presetTheme.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {currentTheme.id === presetTheme.id ? 'Current Theme' : 'Select Theme'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};