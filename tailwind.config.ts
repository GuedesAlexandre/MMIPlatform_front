import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": "425px",
      },
      fontFamily: {
        tahoma: ["tahoma", "sans-serif"],
        "tt-norms-black": ["TT-Norms-Pro-Black", "sans-serif"],
        "tt-norms-black-italic": ["TT-Norms-Pro-Black-Italic", "sans-serif"],
        "tt-norms-extrablack": ["TT-Norms-Pro-ExtraBlack", "sans-serif"],
        "tt-norms-extrablack-italic": [
          "TT-Norms-Pro-ExtraBlack-Italic",
          "sans-serif",
        ],
        "tt-norms-extrabold": ["TT-Norms-Pro-ExtraBold", "sans-serif"],
        "tt-norms-extrabold-italic": [
          "TT-Norms-Pro-ExtraBold-Italic",
          "sans-serif",
        ],
        "tt-norms-bold": ["TT-Norms-Pro-Bold", "sans-serif"],
        "tt-norms-bold-italic": ["TT-Norms-Pro-Bold-Italic", "sans-serif"],
        "tt-norms-extralight": ["TT-Norms-Pro-ExtraLight", "sans-serif"],
        "tt-norms-extralight-italic": [
          "TT-Norms-Pro-ExtraLight-Italic",
          "sans-serif",
        ],
        "tt-norms-light": ["TT-Norms-Pro-Light", "sans-serif"],
        "tt-norms-light-italic": ["TT-Norms-Pro-Light-Italic", "sans-serif"],
        "tt-norms-italic": ["TT-Norms-Pro-Italic", "sans-serif"],
        "tt-norms-medium": ["TT-Norms-Pro-Medium", "sans-serif"],
        "tt-norms-medium-italic": ["TT-Norms-Pro-Medium-Italic", "sans-serif"],
        "tt-norms-regular": ["TT-Norms-Pro-Regular", "sans-serif"],
        "tt-norms-thin": ["TT-Norms-Pro-Thin", "sans-serif"],
        "tt-norms-thin-italic": ["TT-Norms-Pro-Thin-Italic", "sans-serif"],
      },
      colors: {
        "primary-blue": "#2F2A85",
        "primary-blue-hover": "#0F273B",
        "danger": "#D2213C",
        "background-color": "#FAFAFA",
        "text-color-black": "#242424",
        "secondary-text-color": "#959595",
      },
    },
  },
  plugins: [],
};
export default config;
