/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:             '#1E2530',
        'bg-card':      '#2A3444',
        'bg-deep':      '#141A24',
        text:           '#F0EDE8',
        'text-muted':   'rgba(240,237,232,0.50)',
        accent:         '#5B8FA8',
        'accent-light': '#7AAFC8',
      },
      fontFamily: {
        sans:  ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.18em',
        wide:   '0.10em',
        title:  '0.04em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
      transitionDuration: {
        800:  '800ms',
        1200: '1200ms',
      },
    },
  },
  plugins: [],
}
