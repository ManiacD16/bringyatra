import type { Config } from "tailwindcss";

// Palette sampled from the BringYatra logo:
// navy "Bring" (#013564), deep blue B (#004B80), teal gradient (#12B5CB),
// orange "Yatra" / plane (#F26A0F) and the amber swoosh (#FF9F1C).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        navy: {
          50: "#eef5fc",
          100: "#d7e7f7",
          200: "#aecdee",
          300: "#7aaedf",
          400: "#3f86c8",
          500: "#0b5fa0",
          600: "#004b80",
          700: "#013d6c",
          800: "#013564",
          900: "#012447",
          950: "#011a33",
        },
        saffron: {
          50: "#fff5ec",
          100: "#ffe6d0",
          200: "#ffc99c",
          300: "#ffa65f",
          400: "#ff8a2b",
          500: "#f26a0f",
          600: "#e05a00",
          700: "#b94604",
          800: "#93390b",
          900: "#77310c",
        },
        amber: { 400: "#ffb547", 500: "#ff9f1c" },
        teal: { 400: "#3fd0e0", 500: "#12b5cb", 600: "#0b93a8" },
        ink: "#0f1b2d",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px -8px rgba(1, 53, 100, 0.18)",
        lift: "0 22px 48px -18px rgba(1, 53, 100, 0.35)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fly: {
          "0%": { transform: "translate(-10%, 20%) rotate(-8deg)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translate(110vw, -30%) rotate(-8deg)", opacity: "0" },
        },
      },
      animation: {
        kenburns: "kenburns 9s ease-out forwards",
        floaty: "floaty 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        fly: "fly 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
