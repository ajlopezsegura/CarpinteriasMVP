/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:             '#0A1429',
        'bg-card':      '#162238',
        'bg-deep':      '#050A18',
        text:           '#F5EDD8',
        'text-muted':   'rgba(245,237,216,0.55)',
        accent:         '#D4A574',
        'accent-light': '#E8C18A',
        rose:           '#C97B7B',
      },
      fontFamily: {
        sans:  ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['"EB Garamond"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        luxury: '0.18em',
        wide:   '0.10em',
        title:  '0.04em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
    },
  },
  plugins: [],
}
