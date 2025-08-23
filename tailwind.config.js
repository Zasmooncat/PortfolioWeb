/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'smooch': ['Smooch Sans', 'serif'],
        'michroma': ['Michroma', 'serif'],
        'anton': ['Anton', 'serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}