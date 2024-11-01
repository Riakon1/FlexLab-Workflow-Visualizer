import React from 'react';
import { BaseNodeComponent } from './BaseNode';
import { TaskNode as TaskNodeType } from '../../types/nodes';
import { Theme } from '../../types/theme';
import { Calendar, User } from 'lucide-react';

interface TaskNodeProps {
  node: TaskNodeType;
  selected: boolean;
  theme: Theme;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export const TaskNode: React.FC<TaskNodeProps> = (props) => {
  const { node } = props;

  // Add task-specific content
  const additionalContent = (
    <div className="mt-2 space-y-2">
      {node.assignee && (
        <div className="flex items-center gap-2 text-xs">
          <User className="w-4 h-4" />
          <span>{node.assignee}</span>
        </div>
      )}
      {node.dueDate && (
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4" />
          <span>{new Date(node.dueDate).toLocaleDateString()}</span>
        </div>
      )}
      {node.progress > 0 && (
        <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-green-500 transition-all duration-300"
            style={{ width: `${node.progress}%` }}
          />
        </div>
      )}
    </div>
  );

  return <BaseNodeComponent {...props} additionalContent={additionalContent} />;
};