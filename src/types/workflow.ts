import { Position, Size } from './common';
import { Node } from './nodes';

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export interface Note {
  id: string;
  position: Position;
  text: string;
}

export interface Workflow {
  nodes: Node[];
  connections: Connection[];
  notes: Note[];
}

export type SelectedItem = string | null;

export interface ConnectionMode {
  active: boolean;
  sourceId: string | null;
}