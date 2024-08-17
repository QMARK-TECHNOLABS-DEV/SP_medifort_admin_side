/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#9C2677",
        lightGray: "#E8E8E8"
      }
    },
  },
  plugins: [],
}