import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { ThemeCustomizationModal } from './components/ThemeCustomizationModal';
import { AboutModal } from './components/AboutModal';
import { DocumentationViewer } from './components/DocumentationViewer';
import { Position, Node, Connection } from './types/nodes';
import { Theme } from './types/theme';
import { getActiveTheme, setActiveTheme } from './utils/themeStorage';
import { createNode } from './utils/nodeUtils';

export const App: React.FC = () => {
  const [workflow, setWorkflow] = useState<{
    nodes: Node[];
    connections: Connection[];
  }>({ nodes: [], connections: [] });
  
  const [selected, setSelected] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [connectionMode, setConnectionMode] = useState<{ active: boolean; sourceId: string | null }>({
    active: false,
    sourceId: null
  });
  const [theme, setTheme] = useState<Theme>(getActiveTheme());
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  const handleNodeClick = useCallback((id: string) => {
    if (connectionMode.active) {
      if (!connectionMode.sourceId) {
        setConnectionMode({ active: true, sourceId: id });
      } else if (id !== connectionMode.sourceId) {
        const newConnection = {
          id: Math.random().toString(36).substr(2, 9),
          from: connectionMode.sourceId,
          to: id
        };
        
        setWorkflow(prev => ({
          ...prev,
          connections: [...prev.connections, newConnection]
        }));
        setConnectionMode({ active: false, sourceId: null });
      }
    } else {
      setSelected(id);
    }
  }, [connectionMode]);

  const handleAddNode = useCallback((nodeType: string) => {
    const newNode = createNode(nodeType, { x: 100, y: 100 });
    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  }, []);

  const handleNodeMove = useCallback((id: string, position: Position) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(node =>
        node.id === id ? { ...node, position } : node
      )
    }));
  }, []);

  const handleStartConnection = useCallback(() => {
    setConnectionMode({ active: true, sourceId: null });
  }, []);

  const handleDeleteConnection = useCallback((id: string) => {
    setWorkflow(prev => ({
      ...prev,
      connections: prev.connections.filter(conn => conn.id !== id)
    }));
    setSelected(null);
  }, []);

  const handleDeleteNode = useCallback((id: string) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== id),
      connections: prev.connections.filter(
        conn => conn.from !== id && conn.to !== id
      )
    }));
    setSelected(null);
  }, []);

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setActiveTheme(newTheme);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Toolbar
        workflow={workflow}
        onStartConnection={handleStartConnection}
        onSave={() => {}}
        onLoad={() => {}}
        onUndo={() => {}}
        onRedo={() => {}}
        canUndo={false}
        canRedo={false}
        connectionMode={connectionMode}
        theme={theme}
        onThemeChange={handleThemeChange}
        onAddNode={handleAddNode}
        onShowAbout={() => setShowAboutModal(true)}
      />
      <div className="flex-1 relative">
        <Canvas
          nodes={workflow.nodes}
          connections={workflow.connections}
          selected={selected}
          onNodeMove={handleNodeMove}
          onSelect={setSelected}
          onDeleteNode={handleDeleteNode}
          onDeleteConnection={handleDeleteConnection}
          scale={scale}
          offset={offset}
          connectionMode={connectionMode}
          theme={theme}
          onNodeClick={handleNodeClick}
        />
      </div>
      
      {showThemeModal && (
        <ThemeCustomizationModal
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          currentTheme={theme}
          onThemeChange={handleThemeChange}
          theme={theme}
        />
      )}

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        theme={theme}
        onViewDocs={() => {
          setShowAboutModal(false);
          setShowDocs(true);
        }}
      />

      <DocumentationViewer
        isOpen={showDocs}
        onClose={() => setShowDocs(false)}
        theme={theme}
      />
    </div>
  );
};