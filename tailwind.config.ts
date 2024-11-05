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
        "principale-blue": "#2F2A85",
        "dark-blue": "#0F273B",
        "regular-blue": "#0097D7",
        "light-blue": "#1EAFD0",
        red: "#D2213C",
        orange: "#EF7D00",
        yellow: "#FBBA00",
        pink: "#E83583",
        purple: "#8B4A97",
        green: "#00936E",
        "light-green": "#92C56E",
        "background-color": "#FAFAFA",
        "text-color-black": "#242424",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
