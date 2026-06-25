/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#1B4332",
          DEFAULT: "#1B4332",
        },
        accent: {
          DEFAULT: "#F4A261",
          dark: "#E76F51",
          light: "#FFDDD2",
        },
        cream: {
          DEFAULT: "#FEFDF5",
          dark: "#F4ECD8",
        },
        brown: {
          DEFAULT: "#6B4C3B",
          light: "#9C6B4E",
          dark: "#3D2B1F",
        },
        saffron: {
          DEFAULT: "#F4911A",
          light: "#FDD08A",
          dark: "#C9700D",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 8s linear infinite",
        counter: "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #1B4332 100%)",
        "gold-gradient": "linear-gradient(135deg, #F4A261 0%, #F4911A 100%)",
        "earth-gradient": "linear-gradient(135deg, #6B4C3B 0%, #9C6B4E 100%)",
      },
    },
  },
  plugins: [],
};
