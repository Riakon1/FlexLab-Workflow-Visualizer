import { Node, Position } from '../types/nodes';

export const createNode = (type: string, position: Position): Node => ({
  id: Math.random().toString(36).substr(2, 9),
  type,
  position,
  size: { width: 200, height: 100 },
  label: type,
  connectionPoints: {
    input: [{ x: 0, y: 0.5 }],
    output: [{ x: 1, y: 0.5 }]
  }
});