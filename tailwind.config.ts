import type { Config } from "tailwindcss"
import { appConfig } from "./app.config"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      anek: ['Anek Bangla', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      xl: [
        '2.4rem',
        {
          lineHeight: '2.8rem',
          fontWeight: '600',
        },
      ],
      lg: [
        '2rem',
        {
          lineHeight: '2.8rem',
          fontWeight: '400',
        },
      ],
      md: [
        '1.6rem',
        {
          lineHeight: '2.4rem',
          fontWeight: '400',
        },
      ],
      sm: [
        '1.4rem',
        {
          lineHeight: '2rem',
          fontWeight: '400',
        },
      ],
      xs: [
        '1.2rem',
        {
          lineHeight: '1.6rem',
          fontWeight: '400',
        },
      ],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },

    extend: {
      colors: appConfig.themes.colors,
      spacing: appConfig.themes.spacing,
      borderRadius: appConfig.themes.borderRadius,

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
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
