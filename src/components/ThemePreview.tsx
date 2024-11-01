import React from 'react';
import { Theme } from '../types/theme';
import { Square, ArrowRight } from 'lucide-react';

interface ThemePreviewProps {
  theme: Theme;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <div 
      className="w-full aspect-video rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
      style={{ background: theme.colors.canvas }}
    >
      <div className="w-full h-full relative">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${theme.colors.gridSecondary} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.colors.gridSecondary} 1px, transparent 1px),
              linear-gradient(${theme.colors.gridPrimary} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.colors.gridPrimary} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
          }}
        />

        {/* Toolbar Preview */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 border-r border-gray-700/50"
          style={{ background: theme.colors.toolbar }}
        >
          <div className="p-2">
            <div 
              className="w-full aspect-square rounded-lg mb-2"
              style={{ background: theme.colors.toolbarHover }}
            />
            <div 
              className="w-full aspect-square rounded-lg opacity-50"
              style={{ background: theme.colors.toolbarHover }}
            />
          </div>
        </div>

        {/* Canvas Content */}
        <div className="absolute inset-0 ml-16 p-4 flex items-center justify-center">
          {/* First Object */}
          <div
            className="w-24 h-16 flex items-center justify-center rounded-lg relative transform -translate-x-8"
            style={{
              background: theme.colors.objectBackground,
              border: `1px solid ${theme.colors.objectBorder}`,
              color: theme.colors.objectText,
            }}
          >
            <Square className="w-5 h-5" />
          </div>

          {/* Connection Line */}
          <div
            className="w-20 absolute left-1/2 transform -translate-x-4"
            style={{
              height: '2px',
              background: theme.colors.connectionLine,
            }}
          >
            <ArrowRight 
              className="w-4 h-4 absolute -right-1 top-1/2 transform -translate-y-1/2"
              style={{ color: theme.colors.connectionLine }}
            />
          </div>

          {/* Second Object */}
          <div
            className="w-24 h-16 flex items-center justify-center rounded-lg transform translate-x-8"
            style={{
              background: theme.colors.objectBackground,
              border: `1px solid ${theme.colors.objectBorder}`,
              color: theme.colors.objectText,
            }}
          >
            <Square className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};