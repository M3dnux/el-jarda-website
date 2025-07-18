/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        }
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'rtl-gap': '1rem',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.flex-row-rtl': {
          '@apply rtl:flex-row-reverse ltr:flex-row': {},
        },
        '.justify-start-rtl': {
          '@apply rtl:justify-end ltr:justify-start': {},
        },
        '.justify-end-rtl': {
          '@apply rtl:justify-start ltr:justify-end': {},
        },
        '.text-align-rtl': {
          '@apply rtl:text-right ltr:text-left': {},
        },
        '.ml-auto-rtl': {
          '@apply rtl:mr-auto rtl:ml-0 ltr:ml-auto': {},
        },
        '.mr-auto-rtl': {
          '@apply rtl:ml-auto rtl:mr-0 ltr:mr-auto': {},
        },
      })
    }
  ],
}
