/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf7ff',
          100: '#f3ecff',
          200: '#e4d4fc',
          300: '#cdb0f7',
          400: '#ab7ff0',
          500: '#8b5cf6',
          600: '#6d28d9',
          700: '#581c87',
          800: '#3b0764',
          900: '#240843',
          950: '#130424',
          dark: '#10031f',
          deep: '#0a0214',
        },
        violetSubtle: {
          50: '#fcfaff',
          100: '#f7f2fe',
          200: '#ede4fc',
          300: '#dccbf7',
          400: '#c4aaf0',
          500: '#a785e6',
          600: '#875cd4',
          700: '#693cbd',
          800: '#4e2996',
          900: '#34176d',
          950: '#1d0943',
        },
        surface: {
          DEFAULT: '#faf8fe',
          dim: '#ede6f7',
          low: '#f5effc',
          lowest: '#ffffff',
          high: '#e8def4',
          highest: '#d9cbeb',
        }
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'content': '1240px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'ambient': '0 10px 30px -10px rgba(19, 4, 36, 0.08)',
        'ambient-lg': '0 20px 40px -15px rgba(19, 4, 36, 0.16)',
        'violet-glow': '0 4px 20px -2px rgba(109, 40, 217, 0.25)',
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
