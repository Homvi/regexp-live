/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nova: ['Nova Square', 'sans-serif'],
    },
    extend: {},
  },
  // TODO: resolve eslint error
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};
