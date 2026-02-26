export const theme = {
  colors: {
    background: '#0f0a2e',      // Midnight Blue
    surface: 'rgba(36, 11, 54, 0.6)', // Glassy Deep Purple
    surfaceLight: 'rgba(255, 255, 255, 0.1)',
    
    primary: '#7b2cbf',         // Vivid Purple
    primaryGlow: '#9d4edd',
    
    accent: '#00f0ff',          // Cyan / Neon Blue
    accentGlow: 'rgba(0, 240, 255, 0.6)',
    
    text: {
      main: '#ffffff',
      secondary: '#e0aaff',     // Soft Lilac
      muted: '#9ca3af'
    },
    
    gradients: {
      main: 'linear-gradient(135deg, #240b36 0%, #0f0a2e 100%)',
      glass: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      cosmic: 'linear-gradient(45deg, #7b2cbf, #3c096c)',
      button: 'linear-gradient(90deg, #7b2cbf 0%, #9d4edd 100%)'
    }
  },
  
  borderRadius: {
    card: '24px',
    button: '32px',
    pill: '50px'
  },
  
  fonts: {
    heading: "'Cinzel', serif",
    body: "'Inter', sans-serif"
  },
  
  shadows: {
    soft: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 15px rgba(123, 44, 191, 0.5)',
    neon: '0 0 10px rgba(0, 240, 255, 0.7)'
  }
};
