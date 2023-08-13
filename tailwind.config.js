/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind needs to know about every file containing Tailwind class names
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      // pjs: ['var(--font-plus-jakarta-sans)'],
      // staatliches: ['var(--font-staatliches)'],
    },
  },
  plugins: [],
};
