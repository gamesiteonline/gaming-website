import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: '#FAFAFA',
          bgDark: '#1A1A1A',
          fg: '#1A1A1A',
          fgDark: '#FAFAFA',
          primary: '#FF3B30',
          primaryDark: '#FF453A',
          secondary: '#007AFF',
          secondaryDark: '#0A84FF',
          accent: '#FFCC00',
          accentDark: '#FFD60A',
          border: '#1A1A1A',
          borderDark: '#FAFAFA',
          muted: '#E0E0E0',
          mutedDark: '#333333',
          card: '#FFFFFF',
          cardDark: '#242424',
        },
      },
      fontFamily: {
        brutal: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #1A1A1A',
        'brutal-lg': '8px 8px 0px 0px #1A1A1A',
        'brutal-sm': '2px 2px 0px 0px #1A1A1A',
        'brutal-dark': '4px 4px 0px 0px #FAFAFA',
        'brutal-lg-dark': '8px 8px 0px 0px #FAFAFA',
        'brutal-sm-dark': '2px 2px 0px 0px #FAFAFA',
      },
      borderWidth: {
        'brutal': '3px',
        'brutal-lg': '4px',
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;