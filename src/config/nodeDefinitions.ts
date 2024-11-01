import { NodeDefinition } from '../types/nodes';

export const NODE_DEFINITIONS: Record<string, NodeDefinition> = {
  task: {
    id: 'task',
    type: 'task',
    category: 'projectManagement',
    label: 'Task',
    description: 'A basic task or action item',
    icon: 'CheckSquare',
    minWidth: 200,
    minHeight: 100,
    connectionPoints: [
      { id: 'input', type: 'input', position: 'top', x: 0.5, y: 0 },
      { id: 'output', type: 'output', position: 'bottom', x: 0.5, y: 1 }
    ],
    style: {
      backgroundColor: '#1a1f35',
      borderColor: '#2a3147',
      textColor: '#ffffff',
      iconColor: '#4b5563',
      shadowColor: 'rgba(0, 0, 0, 0.2)'
    }
  },
  milestone: {
    id: 'milestone',
    type: 'milestone',
    category: 'projectManagement',
    label: 'Milestone',
    description: 'A project milestone or checkpoint',
    icon: 'Flag',
    minWidth: 200,
    minHeight: 100,
    connectionPoints: [
      { id: 'input', type: 'input', position: 'left', x: 0, y: 0.5 },
      { id: 'output', type: 'output', position: 'right', x: 1, y: 0.5 }
    ],
    style: {
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      textColor: '#ffffff',
      iconColor: '#6b7280',
      shadowColor: 'rgba(0, 0, 0, 0.2)'
    }
  }
};