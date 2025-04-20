/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5", // Indigo-600
          dark: "#4338ca", // Indigo-700
          light: "#6366f1", // Indigo-500
        },
        secondary: {
          DEFAULT: "#1e293b", // Slate-800
          dark: "#0f172a", // Slate-900
          light: "#334155", // Slate-700
        },
      },
    },
  },
  plugins: [],
};
