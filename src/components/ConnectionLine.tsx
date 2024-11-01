import React from 'react';
import { Connection } from '../types/nodes';
import { Theme } from '../types/theme';
import { X } from 'lucide-react';

interface ConnectionLineProps {
  connection: Connection;
  selected: boolean;
  theme: Theme;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  connection,
  selected,
  theme,
  onDelete,
  onClick,
}) => {
  const path = `M ${connection.from} ${connection.to}`;
  const strokeColor = selected ? theme.colors.connectionLineHover : theme.colors.connectionLine;

  return (
    <g className="connection-line">
      <path
        d={path}
        stroke={strokeColor}
        strokeWidth={selected ? 3 : 2}
        fill="none"
        className="transition-all duration-200"
        onClick={onClick}
      />
      {selected && (
        <g
          transform={`translate(${(connection.from + connection.to) / 2}, 0)`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(connection.id);
          }}
          className="cursor-pointer"
        >
          <circle r="12" fill="red" />
          <X className="w-4 h-4 text-white" />
        </g>
      )}
    </g>
  );
};