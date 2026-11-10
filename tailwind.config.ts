import type { Config } from 'tailwindcss';

const config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        xlxl: '1920px',
      },
      colors: {
        black: '#000000',
        sec: '#ffffff',
      },
      height: {
        screen: 'var(--screen-h)',
      },
      minHeight: {
        screen: 'var(--screen-h)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
