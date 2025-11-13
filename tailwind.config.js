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
      // Orange gradient accent colors (tuned warm terracotta tones)
      'orange-accent-light': '#E6B89A',
      'orange-accent-dark': '#C07A52',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'Georgia', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}

