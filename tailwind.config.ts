import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#634cbb',
          light: '#7e6ce0',
        },
        status: {
          approved: '#10B981',
          pending: '#F59E0B',
          error: '#F43F5E',
        },
        bg: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
        icon: {
          muted: '#94A3B8',
        },
        'text-primary': '#0F172A',
        'text-primary-dark': '#FFFFFF',
        'text-secondary': '#475569',
        'text-secondary-dark': '#94A3B8',
      },
    },
  },
  plugins: [],
};

export default config;
