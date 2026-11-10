import type { Config } from 'tailwindcss';

const config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        '3xl': '1920px',
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
