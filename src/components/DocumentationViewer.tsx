import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronRight as Arrow } from 'lucide-react';
import { Theme } from '../types/theme';
import ReactMarkdown from 'react-markdown';
import { DOCUMENTATION } from '../docs/documentation';

interface DocumentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

interface Section {
  title: string;
  level: number;
  content: string;
  index: number;
}

export const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  // Parse sections and their hierarchy
  const sections: Section[] = React.useMemo(() => {
    if (!DOCUMENTATION) return [];

    const lines = DOCUMENTATION.split('\n');
    const parsedSections: Section[] = [];
    let currentContent = '';
    let sectionIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('#')) {
        // If we have content from previous section, save it
        if (parsedSections.length > 0) {
          parsedSections[parsedSections.length - 1].content = currentContent.trim();
        }
        currentContent = '';

        const level = (line.match(/^#+/) || ['#'])[0].length;
        const title = line.replace(/^#+\s*/, '').trim();
        
        parsedSections.push({
          title,
          level,
          content: '',
          index: sectionIndex++
        });
      } else {
        currentContent += line + '\n';
      }
    }

    // Add content for the last section
    if (parsedSections.length > 0) {
      parsedSections[parsedSections.length - 1].content = currentContent.trim();
    }

    return parsedSections;
  }, []);

  if (!isOpen) return null;

  const currentContent = sections[currentSection]?.content || '';

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-gray-900"
    >
      {/* Header */}
      <div className="flex-none flex items-center justify-between p-6 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Documentation</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Navigation */}
        <div className="w-72 border-r border-gray-800 overflow-y-auto p-4 bg-gray-900">
          <div className="space-y-1">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(section.index)}
                className={`w-full text-left rounded-lg transition-colors ${
                  currentSection === section.index 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-gray-200 hover:bg-gray-800'
                }`}
                style={{
                  paddingLeft: `${(section.level - 1) * 16 + 16}px`,
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: section.level === 1 ? '1rem' : 
                          section.level === 2 ? '0.95rem' : '0.9rem',
                  fontWeight: section.level === 1 ? '600' : 
                             section.level === 2 ? '500' : '400',
                }}
              >
                {section.level > 2 && (
                  <Arrow className="w-3 h-3 inline-block mr-2 opacity-50" />
                )}
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-900">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mb-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-bold text-white mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-200 mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-200 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-200" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-gray-200" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="px-1 py-0.5 bg-gray-800 text-blue-300 rounded text-sm" {...props} />
                    : <code className="block p-4 bg-gray-800/50 text-gray-200 rounded-lg overflow-x-auto text-sm" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-transparent" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-300 my-4" {...props} />
                ),
              }}
            >
              {currentContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex-none flex items-center justify-between p-4 border-t border-gray-800 bg-gray-900">
        <button
          onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
          disabled={currentSection === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <div className="text-gray-400">
          {currentSection + 1} / {sections.length}
        </div>
        <button
          onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
          disabled={currentSection === sections.length - 1}
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};