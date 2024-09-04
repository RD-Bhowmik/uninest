/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, and TSX files in the src directory
    "!./node_modules", // Exclude node_modules
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8900de", // Primary color
        sb: "#2b0045" // Secondary color
      },
    },
  },
  plugins: [],
}
