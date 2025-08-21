import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "love-pink": "#ff6b9d",
        "love-purple": "#c44569", 
        "love-red": "#f8b500",
        "love-light": "#ffe5f1",
      },
    },
  },
} satisfies Config;
