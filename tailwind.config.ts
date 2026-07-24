import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        xp: "inset 1px 1px 0 rgba(255,255,255,.85), inset -1px -1px 0 rgba(0,0,0,.18), 0 2px 5px rgba(0,58,140,.22)",
      },
    },
  },
  plugins: [],
} satisfies Config;
