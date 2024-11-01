import { Theme } from '../types/theme';

const ACTIVE_THEME_KEY = 'activeTheme';

// Base theme styles for consistent modern skeuomorphic design
const baseThemeStyles = {
  spacing: {
    toolbarWidth: 288,
    objectPaddingX: 32,
    objectPaddingY: 24,
    objectBorderRadius: 8
  }
};

// Helper function to create theme with consistent styling
const createTheme = (id: string, name: string, colors: Theme['colors']): Theme => ({
  id,
  name,
  colors: {
    ...colors,
    objectBackground: `linear-gradient(180deg, ${colors.objectBackground}05 0%, ${colors.objectBackground} 100%)`,
    objectBorder: colors.objectBorder.replace('0.3', '0.15'), // Softer borders
    modalBackground: colors.toolbar
  },
  ...baseThemeStyles
});

export const predefinedThemes: Theme[] = [
  // Matrix theme with modern styling
  createTheme('dark-matrix', 'Matrix', {
    toolbar: '#1a1f1a',
    toolbarHover: '#2a3f2a',
    canvas: '#0a0f0a',
    gridPrimary: 'rgba(0, 255, 0, 0.07)',
    gridSecondary: 'rgba(0, 255, 0, 0.12)',
    objectBackground: '#1a1f1a',
    objectBorder: 'rgba(0, 255, 0, 0.3)',
    objectText: '#00ff00',
    connectionLine: '#00ff00',
    connectionLineHover: '#00ff00',
    modalBackground: '#1a1f1a'
  }),

  // Cyberpunk theme
  createTheme('cyberpunk', 'Cyberpunk', {
    toolbar: '#180028',
    toolbarHover: '#2a0f3f',
    canvas: '#10001a',
    gridPrimary: 'rgba(255, 0, 255, 0.07)',
    gridSecondary: 'rgba(0, 255, 255, 0.12)',
    objectBackground: '#180028',
    objectBorder: 'rgba(255, 0, 255, 0.3)',
    objectText: '#ff00ff',
    connectionLine: '#00ffff',
    connectionLineHover: '#ff00ff',
    modalBackground: '#180028'
  }),

  // Midnight Blue theme
  createTheme('midnight-blue', 'Midnight Blue', {
    toolbar: '#1a1f35',
    toolbarHover: '#2a3147',
    canvas: '#141829',
    gridPrimary: 'rgba(65, 84, 255, 0.07)',
    gridSecondary: 'rgba(65, 84, 255, 0.12)',
    objectBackground: '#1a1f35',
    objectBorder: 'rgba(255, 255, 255, 0.1)',
    objectText: '#ffffff',
    connectionLine: '#4154ff',
    connectionLineHover: '#6478ff',
    modalBackground: '#1a1f35'
  }),

  // Monokai theme
  createTheme('monokai', 'Monokai', {
    toolbar: '#272822',
    toolbarHover: '#3e3d32',
    canvas: '#1e1f1c',
    gridPrimary: 'rgba(249, 38, 114, 0.07)',
    gridSecondary: 'rgba(249, 38, 114, 0.12)',
    objectBackground: '#272822',
    objectBorder: 'rgba(249, 38, 114, 0.3)',
    objectText: '#f8f8f2',
    connectionLine: '#a6e22e',
    connectionLineHover: '#f92672',
    modalBackground: '#272822'
  }),

  // Nord theme
  createTheme('nord', 'Nord', {
    toolbar: '#2e3440',
    toolbarHover: '#3b4252',
    canvas: '#242933',
    gridPrimary: 'rgba(136, 192, 208, 0.07)',
    gridSecondary: 'rgba(136, 192, 208, 0.12)',
    objectBackground: '#2e3440',
    objectBorder: 'rgba(136, 192, 208, 0.3)',
    objectText: '#eceff4',
    connectionLine: '#88c0d0',
    connectionLineHover: '#81a1c1',
    modalBackground: '#2e3440'
  }),

  // Synthwave theme
  createTheme('synthwave', 'Synthwave', {
    toolbar: '#2b213a',
    toolbarHover: '#3b2952',
    canvas: '#241b2f',
    gridPrimary: 'rgba(255, 66, 244, 0.07)',
    gridSecondary: 'rgba(33, 248, 255, 0.12)',
    objectBackground: '#2b213a',
    objectBorder: 'rgba(255, 66, 244, 0.3)',
    objectText: '#ff42f4',
    connectionLine: '#21f8ff',
    connectionLineHover: '#ff42f4',
    modalBackground: '#2b213a'
  }),

  // Dracula theme
  createTheme('dracula', 'Dracula', {
    toolbar: '#282a36',
    toolbarHover: '#44475a',
    canvas: '#1a1b26',
    gridPrimary: 'rgba(189, 147, 249, 0.07)',
    gridSecondary: 'rgba(189, 147, 249, 0.12)',
    objectBackground: '#282a36',
    objectBorder: 'rgba(189, 147, 249, 0.3)',
    objectText: '#f8f8f2',
    connectionLine: '#ff79c6',
    connectionLineHover: '#bd93f9',
    modalBackground: '#282a36'
  }),

  // Tokyo Night theme
  createTheme('tokyo-night', 'Tokyo Night', {
    toolbar: '#1a1b26',
    toolbarHover: '#24283b',
    canvas: '#16161e',
    gridPrimary: 'rgba(125, 207, 255, 0.07)',
    gridSecondary: 'rgba(125, 207, 255, 0.12)',
    objectBackground: '#1a1b26',
    objectBorder: 'rgba(125, 207, 255, 0.3)',
    objectText: '#a9b1d6',
    connectionLine: '#7aa2f7',
    connectionLineHover: '#bb9af7',
    modalBackground: '#1a1b26'
  }),

  // Solarized Dark theme
  createTheme('solarized-dark', 'Solarized Dark', {
    toolbar: '#002b36',
    toolbarHover: '#073642',
    canvas: '#001e27',
    gridPrimary: 'rgba(38, 139, 210, 0.07)',
    gridSecondary: 'rgba(38, 139, 210, 0.12)',
    objectBackground: '#002b36',
    objectBorder: 'rgba(38, 139, 210, 0.3)',
    objectText: '#839496',
    connectionLine: '#268bd2',
    connectionLineHover: '#2aa198',
    modalBackground: '#002b36'
  }),

  // Gruvbox theme
  createTheme('gruvbox', 'Gruvbox', {
    toolbar: '#282828',
    toolbarHover: '#3c3836',
    canvas: '#1d2021',
    gridPrimary: 'rgba(215, 153, 33, 0.07)',
    gridSecondary: 'rgba(215, 153, 33, 0.12)',
    objectBackground: '#282828',
    objectBorder: 'rgba(215, 153, 33, 0.3)',
    objectText: '#ebdbb2',
    connectionLine: '#d79921',
    connectionLineHover: '#b8bb26',
    modalBackground: '#282828'
  }),

  // Outrun theme
  createTheme('outrun', 'Outrun', {
    toolbar: '#1f1147',
    toolbarHover: '#2a1b4d',
    canvas: '#150b33',
    gridPrimary: 'rgba(239, 71, 111, 0.07)',
    gridSecondary: 'rgba(17, 255, 189, 0.12)',
    objectBackground: '#1f1147',
    objectBorder: 'rgba(239, 71, 111, 0.3)',
    objectText: '#11ffbd',
    connectionLine: '#ef476f',
    connectionLineHover: '#11ffbd',
    modalBackground: '#1f1147'
  }),

  // GitHub Dark theme
  createTheme('github-dark', 'GitHub Dark', {
    toolbar: '#24292e',
    toolbarHover: '#2f363d',
    canvas: '#1b1f23',
    gridPrimary: 'rgba(88, 166, 255, 0.07)',
    gridSecondary: 'rgba(88, 166, 255, 0.12)',
    objectBackground: '#24292e',
    objectBorder: 'rgba(88, 166, 255, 0.3)',
    objectText: '#c9d1d9',
    connectionLine: '#58a6ff',
    connectionLineHover: '#79c0ff',
    modalBackground: '#24292e'
  }),

  // Neon Blood theme
  createTheme('neon-blood', 'Neon Blood', {
    toolbar: '#1a0f0f',
    toolbarHover: '#2a1515',
    canvas: '#120a0a',
    gridPrimary: 'rgba(255, 0, 68, 0.07)',
    gridSecondary: 'rgba(255, 0, 68, 0.12)',
    objectBackground: '#1a0f0f',
    objectBorder: 'rgba(255, 0, 68, 0.3)',
    objectText: '#ff0044',
    connectionLine: '#ff0044',
    connectionLineHover: '#ff4081',
    modalBackground: '#1a0f0f'
  }),

  // Deep Sea theme
  createTheme('deep-sea', 'Deep Sea', {
    toolbar: '#1a2b3c',
    toolbarHover: '#243b4a',
    canvas: '#0f1c2e',
    gridPrimary: 'rgba(0, 255, 255, 0.07)',
    gridSecondary: 'rgba(0, 255, 255, 0.12)',
    objectBackground: '#1a2b3c',
    objectBorder: 'rgba(0, 255, 255, 0.3)',
    objectText: '#7fdbff',
    connectionLine: '#00ffff',
    connectionLineHover: '#7fdbff',
    modalBackground: '#1a2b3c'
  }),

  // Carbon theme
  createTheme('carbon', 'Carbon', {
    toolbar: '#2d2d2d',
    toolbarHover: '#3d3d3d',
    canvas: '#1d1d1d',
    gridPrimary: 'rgba(170, 170, 170, 0.07)',
    gridSecondary: 'rgba(170, 170, 170, 0.12)',
    objectBackground: '#2d2d2d',
    objectBorder: 'rgba(170, 170, 170, 0.3)',
    objectText: '#ffffff',
    connectionLine: '#aaaaaa',
    connectionLineHover: '#ffffff',
    modalBackground: '#2d2d2d'
  }),

  // Moonlight theme
  createTheme('moonlight', 'Moonlight', {
    toolbar: '#222436',
    toolbarHover: '#2f334d',
    canvas: '#1e2030',
    gridPrimary: 'rgba(82, 182, 239, 0.07)',
    gridSecondary: 'rgba(82, 182, 239, 0.12)',
    objectBackground: '#222436',
    objectBorder: 'rgba(82, 182, 239, 0.3)',
    objectText: '#c8d3f5',
    connectionLine: '#52b6ef',
    connectionLineHover: '#82aaff',
    modalBackground: '#222436'
  })
];

export const getActiveTheme = (): Theme => {
  try {
    const activeThemeId = localStorage.getItem(ACTIVE_THEME_KEY);
    return predefinedThemes.find(t => t.id === activeThemeId) || predefinedThemes[0];
  } catch (error) {
    console.error('Failed to get active theme:', error);
    return predefinedThemes[0];
  }
};

export const setActiveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(ACTIVE_THEME_KEY, theme.id);
  } catch (error) {
    console.error('Failed to set active theme:', error);
  }
};