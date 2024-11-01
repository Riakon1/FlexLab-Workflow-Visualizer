import React, { useRef, useState } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { Workflow } from '../types/workflow';
import { Theme } from '../types/theme';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow;
  onSave: () => void;
  onLoad: () => void;
  theme: Theme;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({
  isOpen,
  onClose,
  workflow,
  onSave,
  onLoad,
  theme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState('workflow');

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename.trim() || 'workflow'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    if (!file.type && !file.name.endsWith('.json')) {
      setError('Please select a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        onLoad();
        onClose();
      } catch (error) {
        setError('Invalid workflow file format');
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="rounded-lg p-6 w-96"
        style={{ background: theme.colors.toolbar }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Workflow Management</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 text-red-200 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Save to File</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-200 mb-2">
                  Filename
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="Enter filename"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500"
                  />
                  <span className="flex items-center text-gray-400">.json</span>
                </div>
              </div>
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white"
              >
                <Download className="w-5 h-5" />
                Save to File
              </button>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-2">Load from File</h3>
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => {
                  setError(null);
                  fileInputRef.current?.click();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors text-white"
              >
                <Upload className="w-5 h-5" />
                Load from File
              </button>
              <p className="text-xs text-gray-400">
                Maximum file size: 10MB. Only JSON files are supported.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};