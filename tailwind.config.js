const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], // Correct paths for Vite
  theme: {
    extend: {
      colors: {
        accent: '#e54065',
        background: '#f4f5f9',
        border: '#cfd2dc',
        text: '#636363',
        'filter-btn': '#e1e4ea',
        'read-bg': '#f2f2f2',
        ...colors, // Add the Tailwind's color palette (optional)
      },
    },
  },
  plugins: [],
};
