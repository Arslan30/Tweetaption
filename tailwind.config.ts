import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./remotion/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "unfocused-border-color": "var(--unfocused-border-color)",
        "focused-border-color": "var(--focused-border-color)",

        "button-disabled-color": "var(--button-disabled-color)",
        "disabled-text-color": "var(--disabled-text-color)",
      },

      fontFamily: {
        geist: "var(--geist-font)",
      },

      animation: {
        spinner: "spinner 1.2s linear infinite",
      },

      keyframes: {
        spinner: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.15",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
