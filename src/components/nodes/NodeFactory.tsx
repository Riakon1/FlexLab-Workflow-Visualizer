import React from 'react';
import { Node } from '../../types/nodes';
import { Theme } from '../../types/theme';
import { BaseNodeComponent } from './BaseNode';

interface NodeFactoryProps {
  node: Node;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize?: (id: string, width: number, height: number) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, label: string) => void;
}

export const NodeFactory: React.FC<NodeFactoryProps> = (props) => {
  return <BaseNodeComponent {...props} />;
};