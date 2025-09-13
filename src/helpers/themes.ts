// Light theme
export const lightTheme = {
  background: {
    primary: '#ffffff',
    sidebar: '#f5f5f5',
    chatItemHover: '#eaeaea',
    chatItemSelected: '#e0e0e0',
    messageAI: '#f0f0f0',
    messageUser: '#0d8f6f',
    typingIndicator: '#f0f0f0',
  },
  text: {
    primary: '#222222',
    secondary: '#555555',
    white: '#ffffff',
  },
  button: {
    primary: '#e0e0e0',
    primaryHover: '#0d8f6f',
    activeHover: '#62968a',
    deleteHover: '#ff6b6b',
    deleteBgHover: 'rgba(255, 107, 107, 0.1)',
  },
  messageBubble: {
    aiBorder: '#cccccc',
    userBorder: '#0084ff',
    background: '#ffffff',
  },
  input: {
    background: '#f5f5f5',
    border: '#cccccc',
    placeholder: '#888888',
  },
  status: {
    success: '#0d8f6f',
    error: '#ff6b6b',
    warning: '#ffa500',
  },
};

// Dark theme
export const darkTheme = {
  background: {
    primary: '#424242',
    sidebar: '#40414f',
    chatItemHover: '#565969',
    chatItemSelected: '#565969',
    messageAI: '#4e4e4e',
    messageUser: '#0d8f6f',
    typingIndicator: '#4e4e4e',
  },
  text: {
    primary: '#cfcfcf',
    secondary: '#8e8ea0',
    white: '#ffffff',
  },
  button: {
    primary: '#565969',
    primaryHover: '#0d8f6f',
    activeHover: '#62968a',
    deleteHover: '#ff6b6b',
    deleteBgHover: 'rgba(255, 107, 107, 0.1)',
  },
  messageBubble: {
    aiBorder: '#4e4e4e',
    userBorder: '#0084ff',
    background: '#424242',
  },
  input: {
    background: '#40414f',
    border: '#565969',
    placeholder: '#8e8ea0',
  },
  status: {
    success: '#0d8f6f',
    error: '#ff6b6b',
    warning: '#ffa500',
  },
};

export type ThemeType = typeof lightTheme;
