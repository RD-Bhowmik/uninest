/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary :"#8900de",
        sb : "#2b0045"
      }
    },
  },
  plugins: [],
}