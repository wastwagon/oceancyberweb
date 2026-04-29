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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "semi-opaque-blue": "#143296cc",
        "semi-opaque-very-dark-blue": "#00003280",
        ocean: {
          50: "#e6f4ff",
          100: "#b3dfff",
          200: "#80caff",
          300: "#4db5ff",
          400: "#1aa0ff",
          500: "#0088e6",
          600: "#006bb3",
          700: "#004d80",
          800: "#00304d",
          900: "#001a26",
        },
        teal: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4",
          600: "#00acc1",
          700: "#0097a7",
          800: "#00838f",
          900: "#006064",
        },
        cyan: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4",
        },
        /** Start-Up Agencyy–style marketing tokens (Webflow :root parity) */
        sa: {
          bg: "#000000",
          surface: "#131317",
          primary: "#bbf340",
          heading: "#ffffff",
          muted: "#e9e9e9",
          border: "#414141",
          "border-light": "#e3e3e3",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Oswald", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "wave": "wave 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "sa-marquee": "sa-marquee 32s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "sa-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [
    function touchTargets({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".touch-target": {
          "min-height": "44px",
          "min-width": "44px",
        },
      });
    },
  ],
};

export default config;
