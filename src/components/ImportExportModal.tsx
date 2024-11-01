import React, { useRef, useState } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { Workflow } from '../types/workflow';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow;
  onImport: (workflow: Workflow) => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  workflow,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('workflow');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateWorkflow = (data: any): data is Workflow => {
    if (!data || typeof data !== 'object') return false;
    
    // Check for required arrays
    if (!Array.isArray(data.objects) || !Array.isArray(data.connections) || !Array.isArray(data.notes)) {
      return false;
    }

    // Validate objects
    const validObjects = data.objects.every((obj: any) => (
      obj &&
      typeof obj.id === 'string' &&
      typeof obj.type === 'string' &&
      typeof obj.shape === 'string' &&
      typeof obj.label === 'string' &&
      typeof obj.position === 'object' &&
      typeof obj.position.x === 'number' &&
      typeof obj.position.y === 'number' &&
      typeof obj.size === 'object' &&
      typeof obj.size.width === 'number' &&
      typeof obj.size.height === 'number'
    ));

    // Validate connections
    const validConnections = data.connections.every((conn: any) => (
      conn &&
      typeof conn.id === 'string' &&
      typeof conn.from === 'string' &&
      typeof conn.to === 'string'
    ));

    // Validate notes
    const validNotes = data.notes.every((note: any) => (
      note &&
      typeof note.id === 'string' &&
      typeof note.text === 'string' &&
      typeof note.position === 'object' &&
      typeof note.position.x === 'number' &&
      typeof note.position.y === 'number'
    ));

    return validObjects && validConnections && validNotes;
  };

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
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    // Validate file type
    if (!file.type && !file.name.endsWith('.json')) {
      setError('Please select a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        if (!validateWorkflow(parsed)) {
          setError('Invalid workflow format. Please check the file structure.');
          return;
        }

        onImport(parsed);
        onClose();
      } catch (error) {
        console.error('Failed to parse workflow file:', error);
        setError('Invalid JSON format. Please check the file contents.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Import/Export Workflow</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Filename
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Enter filename"
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center text-gray-500">.json</span>
              </div>
            </div>
            
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors"
            >
              <Download className="w-5 h-5" />
              Export Workflow
            </button>
          </div>

          <div className="relative">
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
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-white bg-green-500 hover:bg-green-600 rounded transition-colors"
            >
              <Upload className="w-5 h-5" />
              Import Workflow
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Maximum file size: 10MB. Only JSON files are supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};