/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Permite activar el modo oscuro añadiendo la clase 'dark' al tag <html> o <body>
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
