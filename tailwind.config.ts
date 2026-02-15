import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a0e27",
          light: "#111827",
        },
        emerald: "#10b981",
        amber: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
