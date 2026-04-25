import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D6EFD",
          dark: "#0B5ED7",
          light: "#3D8BFF",
        },
        secondary: {
          DEFAULT: "#FFB088",
          dark: "#FF9A66",
          light: "#FFC7AA",
        },
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F8F9FA",
        },
        text: {
          DEFAULT: "#212529",
          muted: "#6C757D",
          disabled: "#ADB5BD",
        },
        risk: {
          high: "#DC3545",
          moderate: "#FFC107",
          low: "#0DCAF0",
          normal: "#198754",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        bumaga: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "bumaga-lg": "0 4px 16px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        bumaga: "4px",
        "bumaga-lg": "8px",
      },
    },
  },
  plugins: [],
};

export default config;
