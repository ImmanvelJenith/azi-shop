/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1E40AF',
        'charcoal-gray': '#374151',
        'bright-orange': '#F97316',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
