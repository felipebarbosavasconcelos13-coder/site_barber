/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: 'var(--dynamic-background, #0e0e0e)',
        surface: 'var(--dynamic-surface, #0e0e0e)',
        primary: 'var(--dynamic-primary, #ffe8c7)',
        secondary: 'var(--dynamic-secondary, #ffb693)',
        'surface-dim': 'var(--dynamic-background, #0e0e0e)',
        'surface-container-low': 'var(--dynamic-surface, #0e0e0e)',
        'primary-container': 'var(--dynamic-primary, #ffe8c7)',
        'surface-tint': 'var(--dynamic-primary, #ffe8c7)',
        
        // Cores de fallback padrão DEFAULT_COLORS
        "surface-variant": "#343539",
        "on-primary-container": "#765100",
        "on-primary": "#0d0e12",
        "on-tertiary-fixed": "#1c1b1b",
        "on-primary-fixed-variant": "#604100",
        "secondary-fixed-dim": "#ffb693",
        "on-error": "#690005",
        "tertiary-fixed-dim": "#c9c6c5",
        "outline": "#9c8f7d",
        "secondary-fixed": "#ffdbcc",
        "tertiary-fixed": "#e5e2e1",
        "tertiary-container": "#d1cecd",
        "inverse-on-surface": "#2f3034",
        "on-surface": "#e3e2e7",
        "surface-bright": "#38393d",
        "on-secondary-fixed": "#351000",
        "surface-container": "#1e1f23",
        "inverse-surface": "#e3e2e7",
        "primary-fixed": "#ffdeac",
        "on-surface-variant": "#d3c4b1",
        "error": "#ffb4ab",
        "on-secondary-fixed-variant": "#7a3000",
        "on-tertiary-fixed-variant": "#474646",
        "inverse-primary": "#7e5700",
        "outline-variant": "#4f4536",
        "surface-container-high": "#1a1919",
        "error-container": "#93000a",
        "primary-fixed-dim": "#f6bd5b",
        "tertiary": "#edeaea",
        "on-secondary": "#561f00",
        "secondary-container": "#853500",
        "on-secondary-container": "#ffab83",
        "on-tertiary-container": "#595857",
        "surface-container-highest": "#262626",
        "on-primary-fixed": "#281900"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "section-gap": "80px",
        "base": "8px",
        "container-padding": "24px",
        "gutter": "16px"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "display": ["Space Grotesk", "sans-serif"]
      }
    }
  },
  plugins: [],
}
