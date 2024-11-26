/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      flex: wrap,
    },
  },
  plugins: [require("daisyui")],
};
