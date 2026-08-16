/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B7262",
          light: "#3FA39F",
          dark: "#1E5A58",
          clear: "#E8F5F3",
        },
        secondary: {
          DEFAULT: "#E8A598",
          light: "#F5C1B5",
          dark: "#D4917B",
        },
        navy: {
          DEFAULT: "#1B2B4D",
          light: "#2A3E5F",
          dark: "#0F1A2E",
        },
        footer: {
          DEFAULT: "#F4F4F4",
          dark: "#051145",
          light: "#54595F",
          green: "#1B7261",
          ground: "#FFFCFC",
        },
      },
      fontFamily: {
        sail: ["Sail", "cursive"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Libre Bodoni", "Georgia", "serif"],
        sail: ["Sail", "cursive"],
        bodoni: ["Libre Bodoni", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
