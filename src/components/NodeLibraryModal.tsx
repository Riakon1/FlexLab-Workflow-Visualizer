import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Theme } from '../types/theme';
import { NODE_CATEGORIES } from '../config/nodeCategories';

interface NodeLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (nodeType: string) => void;
  theme: Theme;
}

export const NodeLibraryModal: React.FC<NodeLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectNode,
  theme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    return Object.entries(NODE_CATEGORIES).filter(([_, category]) => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingNodes = category.nodes.some(node => 
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearch || hasMatchingNodes;
    });
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="w-full max-w-4xl h-[80vh] rounded-xl flex flex-col"
        style={{ background: theme.colors.modalBackground }}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Node Library</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="flex-none p-4 border-b border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search nodes..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Categories */}
          <div className="w-64 border-r border-gray-800 overflow-y-auto">
            <div className="p-4 space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  !selectedCategory ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                All Categories
              </button>
              {filteredCategories.map(([id, category]) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === id ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Nodes Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              {filteredCategories
                .filter(([id]) => !selectedCategory || id === selectedCategory)
                .map(([categoryId, category]) => (
                  <React.Fragment key={categoryId}>
                    {category.nodes
                      .filter(node => 
                        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        node.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(node => {
                        const IconComponent = (Icons as any)[node.icon] || Icons.Box;
                        return (
                          <button
                            key={node.type}
                            onClick={() => {
                              onSelectNode(node.type);
                              onClose();
                            }}
                            className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-900 transition-colors group"
                            style={{ 
                              borderLeft: `4px solid ${category.color}`,
                            }}
                          >
                            <div className="flex-none">
                              <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="font-medium text-white mb-1">{node.label}</h3>
                              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                                {node.description}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    }
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};