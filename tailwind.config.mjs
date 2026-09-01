/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f2fb',
          100: '#e9e6f6',
          200: '#d2cced',
          300: '#b4a6df',
          400: '#8e77ce',
          500: '#673ab7',
          600: '#5e35b1',
          700: '#512da8',
          800: '#4527a0',
          900: '#311b92',
          dark: '#1c0070',
          deep: '#140050',
        },
        gold: {
          50: '#fdfaf3',
          100: '#f9f2de',
          200: '#f2e2b5',
          300: '#e8ce84',
          400: '#d9b449',
          500: '#c59b27',
          600: '#a87e1a',
          700: '#775a19',
          800: '#5d4201',
          900: '#261900',
          container: '#fed488',
          accent: '#d4af37',
        },
        slateSubtle: {
          50: '#f5f8f9',
          100: '#e5edf1',
          500: '#475e67',
          800: '#25373e',
          900: '#0f2228',
        },
        surface: {
          DEFAULT: '#f9f9fb',
          dim: '#d9dadc',
          low: '#f3f3f5',
          lowest: '#ffffff',
          high: '#e8e8ea',
          highest: '#e2e2e4',
        }
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'ambient': '0 10px 30px -10px rgba(28, 0, 112, 0.08)',
        'ambient-lg': '0 20px 40px -15px rgba(28, 0, 112, 0.12)',
        'gold-glow': '0 4px 20px -2px rgba(197, 155, 39, 0.25)',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
