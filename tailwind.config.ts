import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Clients/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'translateY(20px)', opacity: "0" },
          '100%': { transform: 'translateY(0)', opacity: "1" },
        },
        fadein: {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" },
        },
        pulse: {
          '0%, 100%': { opacity: "1" },
          '50%': { opacity: "0.5" },
        },
      },
      animation: {
        slidein: 'slidein 0.5s ease-out forwards',
        fadein: 'fadein 0.8s ease-out forwards',
        pulse: 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
