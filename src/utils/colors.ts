// Custom Color Palette
export const colors = {
  // Primary (Gold Gradient)
  primary: {
    DEFAULT: '#D4A017',
    50: '#FDF8E8',
    100: '#FAF0D1',
    200: '#F5E1A3',
    300: '#F0D275',
    400: '#EBC347',
    500: '#D4A017', // Main gold
    600: '#B8890F',
    700: '#9C720C',
    800: '#805B0A',
    900: '#644407',
  },
  
  // Secondary (Charcoal Black)
  secondary: {
    DEFAULT: '#1E1E1E',
    50: '#F5F5F5',
    100: '#E8E8E8',
    200: '#D1D1D1',
    300: '#BABABA',
    400: '#A3A3A3',
    500: '#8C8C8C',
    600: '#757575',
    700: '#5E5E5E',
    800: '#474747',
    900: '#1E1E1E', // Main charcoal
  },
  
  // Accent (Soft White)
  accent: {
    DEFAULT: '#F8F8F8',
    50: '#FFFFFF',
    100: '#FDFDFD',
    200: '#FBFBFB',
    300: '#F9F9F9',
    400: '#F8F8F8', // Main soft white
    500: '#F0F0F0',
    600: '#E8E8E8',
    700: '#E0E0E0',
    800: '#D8D8D8',
    900: '#D0D0D0',
  },
  
  // Neutral Gray
  neutral: {
    DEFAULT: '#E5E5E5',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E5E5E5', // Main neutral
    400: '#DBDBDB',
    500: '#D1D1D1',
    600: '#C7C7C7',
    700: '#BDBDBD',
    800: '#B3B3B3',
    900: '#A9A9A9',
  },
  
  // Highlight Accent (Royal Blue)
  highlight: {
    DEFAULT: '#3B5BA9',
    50: '#EEF2FB',
    100: '#DCE5F7',
    200: '#B9CBEF',
    300: '#96B1E7',
    400: '#7397DF',
    500: '#507DD7',
    600: '#4A6BC5',
    700: '#3B5BA9', // Main royal blue
    800: '#324B8D',
    900: '#293B71',
  },
} as const;

// Utility functions for common color combinations
export const colorCombinations = {
  // Button styles
  primaryButton: 'bg-primary text-secondary hover:bg-primary-600',
  secondaryButton: 'bg-secondary text-accent hover:bg-secondary-800',
  highlightButton: 'bg-highlight text-accent hover:bg-highlight-800',
  
  // Card styles
  card: 'bg-accent border border-neutral',
  cardDark: 'bg-secondary-800 border border-secondary-700',
  
  // Text styles
  primaryText: 'text-secondary',
  secondaryText: 'text-secondary-600',
  accentText: 'text-accent',
  highlightText: 'text-highlight',
  
  // Background styles
  primaryBg: 'bg-primary',
  secondaryBg: 'bg-secondary',
  accentBg: 'bg-accent',
  neutralBg: 'bg-neutral',
  highlightBg: 'bg-highlight',
  
  // Border styles
  primaryBorder: 'border-primary',
  secondaryBorder: 'border-secondary',
  neutralBorder: 'border-neutral',
  highlightBorder: 'border-highlight',
} as const;

// CSS custom properties for dynamic usage
export const cssVariables = {
  '--color-primary': '#D4A017',
  '--color-secondary': '#1E1E1E',
  '--color-accent': '#F8F8F8',
  '--color-neutral': '#E5E5E5',
  '--color-highlight': '#3B5BA9',
} as const;