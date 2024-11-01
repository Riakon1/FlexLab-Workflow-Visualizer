import React from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types/theme';
import { TesseractLogo } from './TesseractLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onViewDocs: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  theme,
  onViewDocs
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ background: theme.colors.modalBackground }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">About FlexLab</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-24 h-24 mb-6">
            <TesseractLogo />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 mb-2">
            FlexLab Workflow Designer
          </h1>

          {/* Version */}
          <div className="text-gray-400 mb-6">
            Version 1.0.0
          </div>

          {/* Author */}
          <div className="text-gray-300 mb-8">
            Created by William Yarbrough<br />
            <a 
              href="mailto:Will@AxioFlex.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Will@AxioFlex.com
            </a>
          </div>

          {/* Documentation Button */}
          <button
            onClick={onViewDocs}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            View Documentation
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2024 FlexLab. All rights reserved.
        </div>
      </div>
    </div>
  );
};