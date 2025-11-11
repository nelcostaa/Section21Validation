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
        'noble-light-green': '#DFF2E1',
        'noble-dark-green': '#364D3F',
      },
    },
  },
  plugins: [],
}

