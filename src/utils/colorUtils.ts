export const COLOR_NAMES: Record<string, string> = {
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#00FF00': 'Lime',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#00FFFF': 'Cyan',
  '#FF00FF': 'Magenta',
  '#808080': 'Gray',
  '#C0C0C0': 'Silver',
  '#800000': 'Maroon',
  '#808000': 'Olive',
  '#008000': 'Green',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#000080': 'Navy',
  // Add more color mappings as needed
};

export const getColorName = (hex: string): string => {
  if (!hex) return '';
  
  // Handle RGB/RGBA values
  if (hex.startsWith('rgb')) return hex;
  
  // Normalize hex color
  const normalizedHex = hex.toUpperCase();
  
  return COLOR_NAMES[normalizedHex] || hex;
};

export const isValidColor = (color: string): boolean => {
  if (!color) return false;
  
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (!hex) return null;
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};