import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        bold: '700',
      },
      colors: {
        'mint-green': '#e6f7ef',
        'greenify-button-green': '#09ad5f',
        'coffee-green': '#006241',
        'ge-black': '#171717',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;