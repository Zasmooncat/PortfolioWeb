/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'smooch': ['Smooch Sans', 'serif'],
      'michroma': ['Michroma', 'serif'], 
      'anton': ['Anton', 'serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}