import React from 'react';
import { BaseNodeComponent } from './BaseNode';
import { ProcessNode as ProcessNodeType } from '../../types/nodes';
import { Theme } from '../../types/theme';
import { GitBranch, GitMerge } from 'lucide-react';

interface ProcessNodeProps {
  node: ProcessNodeType;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const ProcessNode: React.FC<ProcessNodeProps> = (props) => {
  const { node } = props;

  // Add process-specific content
  const additionalContent = (
    <div className="mt-2 space-y-2">
      {node.type === 'decision' && (
        <div className="flex items-center gap-2 text-xs">
          <GitBranch className="w-4 h-4" />
          <span>Condition: {node.condition}</span>
        </div>
      )}
      {node.type === 'gateway' && (
        <div className="flex items-center gap-2 text-xs">
          <GitMerge className="w-4 h-4" />
          <span>Type: {node.gatewayType}</span>
        </div>
      )}
    </div>
  );

  return <BaseNodeComponent {...props} additionalContent={additionalContent} />;
};