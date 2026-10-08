import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        "dark-secondary": "var(--color-dark-secondary)",
        milk: "var(--color-milk)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-active": "var(--color-accent-active)",
        light: "var(--color-light)",
        "light-text": "var(--color-light-text)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        quiet: "cubic-bezier(.2,.8,.2,1)"
      }
    }
  },
  plugins: []
};

export default config;
