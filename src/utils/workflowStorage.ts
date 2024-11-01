import { Workflow } from '../types/workflow';

const STORAGE_KEY = 'workflow';

export const saveWorkflow = (workflow: Workflow): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflow));
  } catch (error) {
    console.error('Failed to save workflow:', error);
  }
};

export const loadWorkflow = (): Workflow | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load workflow:', error);
    return null;
  }
};