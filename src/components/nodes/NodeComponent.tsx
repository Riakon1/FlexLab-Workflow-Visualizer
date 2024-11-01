import React from 'react';
import { Node } from '../../types/nodes';
import { Theme } from '../../types/theme';

interface NodeComponentProps {
  node: Node;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onStartConnection: () => void;
  onCompleteConnection: () => void;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  selected,
  theme,
  onMouseDown,
  onStartConnection,
  onCompleteConnection,
}) => {
  return (
    <div
      className={`absolute rounded-lg transition-shadow duration-200 ${
        selected ? 'ring-2 ring-blue-400 shadow-lg' : ''
      }`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
        background: theme.colors.objectBackground,
        border: `1px solid ${theme.colors.objectBorder}`,
        color: theme.colors.objectText,
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        {node.icon && <span className="mr-2">{node.icon}</span>}
        <span className="font-medium">{node.label}</span>
      </div>
      <div className="p-3">
        {/* Node content goes here */}
      </div>
    </div>
  );
};