import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0f',
        foreground: '#f5f5f5',
        chilean: {
          red: '#d7263d',
          blue: '#0033a0',
          white: '#ffffff',
        },
      },
      fontFamily: {
        plex: ['var(--font-plex)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.45)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
