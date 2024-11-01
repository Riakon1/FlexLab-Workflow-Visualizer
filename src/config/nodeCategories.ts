import { NodeCategory } from '../types/nodes';

export const NODE_CATEGORIES: Record<string, NodeCategory> = {
  project: {
    name: 'Project Management',
    color: '#3B82F6',
    nodes: [
      {
        type: 'task',
        label: 'Task',
        description: 'A basic task or action item',
        icon: 'CheckSquare',
      },
      {
        type: 'milestone',
        label: 'Milestone',
        description: 'Project milestone or checkpoint',
        icon: 'Flag',
      },
      {
        type: 'approval',
        label: 'Approval',
        description: 'Approval or review gate',
        icon: 'UserCheck',
      }
    ]
  },
  data: {
    name: 'Data Flow',
    color: '#10B981',
    nodes: [
      {
        type: 'dataSource',
        label: 'Data Source',
        description: 'External data source or input',
        icon: 'Database',
      },
      {
        type: 'transform',
        label: 'Transform',
        description: 'Data transformation or processing',
        icon: 'RefreshCw',
      },
      {
        type: 'storage',
        label: 'Storage',
        description: 'Data storage or output',
        icon: 'HardDrive',
      }
    ]
  },
  development: {
    name: 'Development',
    color: '#8B5CF6',
    nodes: [
      {
        type: 'feature',
        label: 'Feature',
        description: 'New feature development',
        icon: 'Code',
      },
      {
        type: 'review',
        label: 'Code Review',
        description: 'Code review process',
        icon: 'GitPullRequest',
      },
      {
        type: 'test',
        label: 'Testing',
        description: 'Testing and QA',
        icon: 'TestTube',
      }
    ]
  },
  process: {
    name: 'Business Process',
    color: '#EC4899',
    nodes: [
      {
        type: 'start',
        label: 'Start',
        description: 'Process start point',
        icon: 'Play',
      },
      {
        type: 'activity',
        label: 'Activity',
        description: 'Business activity or process',
        icon: 'Activity',
      },
      {
        type: 'gateway',
        label: 'Gateway',
        description: 'Decision or merge point',
        icon: 'GitBranch',
      }
    ]
  },
  marketing: {
    name: 'Marketing',
    color: '#F59E0B',
    nodes: [
      {
        type: 'campaign',
        label: 'Campaign',
        description: 'Marketing campaign',
        icon: 'Megaphone',
      },
      {
        type: 'content',
        label: 'Content',
        description: 'Content creation and management',
        icon: 'FileText',
      },
      {
        type: 'analytics',
        label: 'Analytics',
        description: 'Marketing analytics and metrics',
        icon: 'BarChart',
      }
    ]
  },
  manufacturing: {
    name: 'Manufacturing',
    color: '#EF4444',
    nodes: [
      {
        type: 'supply',
        label: 'Supply',
        description: 'Supply and inventory',
        icon: 'Package',
      },
      {
        type: 'production',
        label: 'Production',
        description: 'Manufacturing process',
        icon: 'Factory',
      },
      {
        type: 'distribution',
        label: 'Distribution',
        description: 'Product distribution',
        icon: 'Truck',
      }
    ]
  },
  support: {
    name: 'Customer Support',
    color: '#06B6D4',
    nodes: [
      {
        type: 'ticket',
        label: 'Ticket',
        description: 'Support ticket',
        icon: 'Ticket',
      },
      {
        type: 'resolution',
        label: 'Resolution',
        description: 'Issue resolution',
        icon: 'CheckCircle',
      },
      {
        type: 'feedback',
        label: 'Feedback',
        description: 'Customer feedback',
        icon: 'MessageSquare',
      }
    ]
  },
  hr: {
    name: 'HR',
    color: '#14B8A6',
    nodes: [
      {
        type: 'application',
        label: 'Application',
        description: 'Job application',
        icon: 'FileText',
      },
      {
        type: 'interview',
        label: 'Interview',
        description: 'Interview process',
        icon: 'Users',
      },
      {
        type: 'onboarding',
        label: 'Onboarding',
        description: 'Employee onboarding',
        icon: 'UserPlus',
      }
    ]
  },
  research: {
    name: 'Research',
    color: '#6366F1',
    nodes: [
      {
        type: 'hypothesis',
        label: 'Hypothesis',
        description: 'Research hypothesis',
        icon: 'Lightbulb',
      },
      {
        type: 'experiment',
        label: 'Experiment',
        description: 'Research experiment',
        icon: 'Flask',
      },
      {
        type: 'results',
        label: 'Results',
        description: 'Research results',
        icon: 'ClipboardCheck',
      }
    ]
  },
  training: {
    name: 'Training',
    color: '#8B5CF6',
    nodes: [
      {
        type: 'lesson',
        label: 'Lesson',
        description: 'Training lesson',
        icon: 'BookOpen',
      },
      {
        type: 'assessment',
        label: 'Assessment',
        description: 'Knowledge assessment',
        icon: 'ClipboardList',
      },
      {
        type: 'resource',
        label: 'Resource',
        description: 'Training resource',
        icon: 'FileText',
      }
    ]
  }
};