import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#0f766e',
        surface: '#f8fafc',
        panel: '#ffffff',
        border: '#d1d5db',
        overlay: 'rgba(15, 23, 42, 0.4)',
        text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
          inverse: '#ffffff',
        },
        success: '#16a34a',
        warning: '#d97706',
        danger: '#dc2626',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      fontSize: {
        xxs: ['0.6875rem', '1rem'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
        focus: '0 0 0 3px rgba(37, 99, 235, 0.35)',
      },
      screens: {
        xs: '480px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
