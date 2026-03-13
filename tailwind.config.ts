import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080c16',
          900: '#0a0e1a',
          800: '#0f1629',
          700: '#161d35',
          600: '#1e2844',
          500: '#2a3b6b',
        },
        gold: {
          300: '#e8cb7a',
          400: '#d4a853',
          500: '#c9963c',
          600: '#b8862d',
          700: '#9a7024',
        },
        cream: {
          50: '#FDFCF9',
          100: '#F8F6F0',
          200: '#F0EDE4',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
