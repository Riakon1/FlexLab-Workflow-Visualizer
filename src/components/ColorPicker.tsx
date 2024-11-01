import React, { useState, useEffect } from 'react';
import { getColorName } from '../utils/colorUtils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value = '#000000', onChange, label }) => {
  const [colorName, setColorName] = useState('');
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value) {
      setInputValue(value);
      setColorName(getColorName(value));
    }
  }, [value]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update if it's a valid color value
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/) || 
        newValue.match(/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/) ||
        newValue.match(/^rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*[0-1](\.\d+)?\)$/)) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="flex gap-3 items-center">
        <div className="relative">
          <input
            type="color"
            value={value?.match(/^#[0-9A-Fa-f]{6}$/) ? value : '#000000'}
            onChange={handleColorChange}
            className="w-10 h-10 rounded-lg cursor-pointer border border-gray-700 p-1"
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleTextChange}
          onBlur={() => setInputValue(value)}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>
      {colorName && (
        <p className="text-xs text-gray-500">{colorName}</p>
      )}
    </div>
  );
};