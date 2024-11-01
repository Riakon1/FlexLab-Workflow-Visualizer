export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  size: Size;
  label: string;
  icon?: string;
  category?: string;
  connectionPoints?: {
    input: Position[];
    output: Position[];
  };
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  type?: string;
  label?: string;
}