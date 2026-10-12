/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#284638',
        'forest-2': '#3e6754',
        ink: '#303a33',
        muted: '#6c766f',
        cream: '#fffdf8',
        paper: '#f5f1e7',
        saffron: '#b65e3d',
        red: '#9d3027',
        gold: '#c59b4d',
        line: '#e6e2d8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Manrope', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
