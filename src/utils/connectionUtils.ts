import { Position, WorkflowObject } from '../types/workflow';

export const calculateConnectionPath = (from: WorkflowObject, to: WorkflowObject): string => {
  // Calculate the center points of the objects
  const fromCenter = {
    x: from.position.x + from.size.width / 2,
    y: from.position.y + from.size.height / 2,
  };
  const toCenter = {
    x: to.position.x + to.size.width / 2,
    y: to.position.y + to.size.height / 2,
  };

  // Calculate control points for the curve
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Adjust control point distance based on the distance between objects
  const controlPointOffset = Math.min(distance / 2, 150);

  // Create smooth curve using cubic bezier
  const controlPoint1 = {
    x: fromCenter.x + controlPointOffset,
    y: fromCenter.y,
  };
  const controlPoint2 = {
    x: toCenter.x - controlPointOffset,
    y: toCenter.y,
  };

  return `M ${fromCenter.x} ${fromCenter.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${toCenter.x} ${toCenter.y}`;
};