// Main background colors
export const BACKGROUND_COLORS = {
  PRIMARY: '#424242', // Main app background
  SIDEBAR: '#40414f', // Sidebar background
  CHAT_ITEM_HOVER: '#565969', // Chat item hover state
  CHAT_ITEM_SELECTED: '#565969', // Selected chat item
  MESSAGE_AI: '#4e4e4e', // AI message background
  MESSAGE_USER: '#0d8f6f', // User message background
  TYPING_INDICATOR: '#4e4e4e', // Typing indicator background
} as const;

// Text colors
export const TEXT_COLORS = {
  PRIMARY: '#cfcfcf', // Main text color
  SECONDARY: '#8e8ea0', // Secondary text (like delete button)
  WHITE: '#ffffff', // White text
} as const;

// Button colors
export const BUTTON_COLORS = {
  PRIMARY: '#565969', // Primary button background
  PRIMARY_HOVER: '#0d8f6f', // Primary button hover
  DELETE_HOVER: '#ff6b6b', // Delete button hover
  DELETE_BG_HOVER: 'rgba(255, 107, 107, 0.1)', // Delete button background hover
} as const;

// Message bubble colors
export const MESSAGE_BUBBLE_COLORS = {
  AI_BORDER: '#4e4e4e', // AI message border
  USER_BORDER: '#0084ff', // User message border
  BACKGROUND: '#424242', // Message bubble background
} as const;

// Input colors
export const INPUT_COLORS = {
  BACKGROUND: '#40414f', // Input background
  BORDER: '#565969', // Input border
  PLACEHOLDER: '#8e8ea0', // Placeholder text
} as const;

// Status colors
export const STATUS_COLORS = {
  SUCCESS: '#0d8f6f', // Success/positive actions
  ERROR: '#ff6b6b', // Error/destructive actions
  WARNING: '#ffa500', // Warning states
} as const;
