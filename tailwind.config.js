import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nova: ['Nova Square', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['corporate'],
  },
};
