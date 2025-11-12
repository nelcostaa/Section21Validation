/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — replace with exact HEXs from your Figma/asset inspector if you have them
        'noble-light-green': '#F7F3F0',
        'noble-dark-green': '#3A3A3A',
      // Simple/beige theme tokens
      'simple-beige': '#efe6df',
      'simple-dark': '#2b2b2b',
      },
    },
  },
  plugins: [],
}

