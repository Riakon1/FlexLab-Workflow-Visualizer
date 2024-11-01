import React from 'react';
import { BaseNodeComponent } from './BaseNode';
import { DataSourceNode as DataSourceNodeType } from '../../types/nodes';
import { Theme } from '../../types/theme';
import { Database, Link } from 'lucide-react';

interface DataSourceNodeProps {
  node: DataSourceNodeType;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const DataSourceNode: React.FC<DataSourceNodeProps> = (props) => {
  const { node } = props;

  // Add data source-specific content
  const additionalContent = (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2 text-xs">
        <Database className="w-4 h-4" />
        <span>{node.sourceType}</span>
      </div>
      {node.connectionConfig.url && (
        <div className="flex items-center gap-2 text-xs">
          <Link className="w-4 h-4" />
          <span className="truncate">{node.connectionConfig.url}</span>
        </div>
      )}
    </div>
  );

  return <BaseNodeComponent {...props} additionalContent={additionalContent} />;
};