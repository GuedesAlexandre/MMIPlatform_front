import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  safelist: [
    "bg-yellow-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
    "bg-orange-100",
    "border-yellow-300",
    "border-green-300",
    "border-blue-300",
    "border-purple-300",
    "border-orange-300",
    "text-yellow-800",
    "text-green-800",
    "text-blue-800",
    "text-purple-800",
    "text-orange-800",
    "text-yellow-300",
    "text-green-300",
    "text-blue-300",
    "text-purple-300",
    "text-orange-300",
    "dark:bg-gray-700",
    "dark:text-yellow-300",
    "dark:text-green-300",
    "dark:text-blue-300",
    "dark:text-purple-300",
    "dark:text-orange-300",
  ],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xs: "425px",
      },
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
    extend: {
      colors: {
        "primary-blue": "#2F2A85",
        "primary-blue-hover": "#0F273B",
        danger: "#D2213C",
        "background-color": "#FAFAFA",
        "text-color-black": "#242424",
        "secondary-text-color": "#959595",
        "placeholder-color": "#939393",
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "2xs": "0.65rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
