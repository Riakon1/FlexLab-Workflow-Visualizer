import React, { useState } from 'react';
import { Link, StickyNote, FileJson, Palette, Plus, Info } from 'lucide-react';
import { WorkflowModal } from './WorkflowModal';
import { NodeLibraryModal } from './NodeLibraryModal';
import { Theme } from '../types/theme';
import { Node } from '../types/nodes';

interface ToolbarProps {
  workflow: {
    nodes: Node[];
    connections: any[];
  };
  onStartConnection: () => void;
  onSave: () => void;
  onLoad: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onThemeChange: (theme: Theme) => void;
  onAddNode: (nodeType: string) => void;
  onShowAbout: () => void;
  canUndo: boolean;
  canRedo: boolean;
  connectionMode: { active: boolean; sourceId: string | null };
  theme: Theme;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  workflow,
  onStartConnection,
  onSave,
  onLoad,
  onUndo,
  onRedo,
  onThemeChange,
  onAddNode,
  onShowAbout,
  canUndo,
  canRedo,
  connectionMode,
  theme
}) => {
  const [showNodeLibrary, setShowNodeLibrary] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  return (
    <>
      <div 
        className="toolbar flex flex-col gap-3 p-5 h-full custom-scrollbar overflow-y-auto"
        style={{ 
          width: theme.spacing.toolbarWidth,
          background: theme.colors.toolbar
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-2 pb-6 mb-2 border-b border-white/10">
          <div className="p-2 bg-black rounded-lg backdrop-blur-sm">
            <img src="/src/public/tesseract.gif" alt="FlexLab Logo" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              FlexLab
            </span>
            <span className="text-xs text-white/50">Workflow Designer</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-4 border-b border-white/10">
          <button
            onClick={() => setShowNodeLibrary(true)}
            className="toolbar-button flex items-center gap-3 p-3 text-white/90 rounded-lg"
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <Plus className="w-5 h-5" />
            Add Node
          </button>
          <button
            onClick={onStartConnection}
            className={`toolbar-button flex items-center gap-3 p-3 rounded-lg ${
              connectionMode ? 'bg-blue-500/20 text-blue-400' : 'text-white/90'
            }`}
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <Link className="w-5 h-5" />
            Add Connection
          </button>
          <button
            onClick={() => {}}
            className="toolbar-button flex items-center gap-3 p-3 text-white/90 rounded-lg"
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <StickyNote className="w-5 h-5" />
            Add Note
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {}}
            className="toolbar-button flex items-center gap-3 p-3 text-white/90 rounded-lg"
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <Palette className="w-5 h-5" />
            Customize Theme
          </button>
          <button
            onClick={() => setShowWorkflowModal(true)}
            className="toolbar-button flex items-center gap-3 p-3 text-white/90 rounded-lg"
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <FileJson className="w-5 h-5" />
            Save/Load
          </button>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`toolbar-button flex items-center gap-3 p-3 rounded-lg ${
              canUndo ? 'text-white/90' : 'text-white/30 cursor-not-allowed'
            }`}
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`toolbar-button flex items-center gap-3 p-3 rounded-lg ${
              canRedo ? 'text-white/90' : 'text-white/30 cursor-not-allowed'
            }`}
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            Redo
          </button>
        </div>

        {/* About Button */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <button
            onClick={onShowAbout}
            className="toolbar-button flex items-center gap-3 p-3 text-white/90 rounded-lg w-full"
            style={{ borderRadius: theme.spacing.objectBorderRadius }}
          >
            <Info className="w-5 h-5" />
            About FlexLab
          </button>
        </div>
      </div>

      <NodeLibraryModal
        isOpen={showNodeLibrary}
        onClose={() => setShowNodeLibrary(false)}
        onSelectNode={onAddNode}
        theme={theme}
      />

      <WorkflowModal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
        workflow={workflow}
        onSave={onSave}
        onLoad={onLoad}
        theme={theme}
      />
    </>
  );
};