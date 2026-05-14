import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-fixed-dim": "#a1c9ff",
        "on-surface": "#1a1c1e",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#ffb59d",
        "on-secondary-container": "#004b84",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "surface-variant": "#e2e2e5",
        "primary-container": "#782b07",
        "on-tertiary-container": "#00383a",
        "on-secondary-fixed": "#001c37",
        "on-primary-container": "#5f1900",
        "surface-container-highest": "#e2e2e5",
        error: "#ba1a1a",
        "on-tertiary-fixed": "#002021",
        "tertiary-container": "#00aab0",
        "inverse-on-surface": "#f0f0f3",
        primary: "#782b07",
        "on-primary-fixed-variant": "#832600",
        "on-tertiary-fixed-variant": "#004f52",
        "surface-container-low": "#f3f3f6",
        "secondary-container": "#87bcfe",
        "on-secondary-fixed-variant": "#004880",
        "secondary-fixed": "#d2e4ff",
        secondary: "#24619d",
        "tertiary-fixed-dim": "#48dae0",
        "primary-fixed-dim": "#ffb59d",
        "on-primary-fixed": "#390c00",
        "outline-variant": "#e1bfb5",
        "surface-container-high": "#e8e8ea",
        background: "#f9f9fc",
        "surface-container": "#eeeef0",
        "surface-bright": "#f9f9fc",
        "on-error": "#ffffff",
        "inverse-surface": "#2f3133",
        "tertiary-fixed": "#6bf6fc",
        surface: "#f9f9fc",
        "primary-fixed": "#ffdbd0",
        "on-primary": "#ffffff",
        "surface-dim": "#dadadc",
        outline: "#8d7168",
        tertiary: "#00696d",
        "surface-tint": "#ab3500",
        "on-surface-variant": "#594139",
        "on-secondary": "#ffffff",
        "on-background": "#1a1c1e",
      },

      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },

      spacing: {
        "margin-desktop": "64px",
        "container-max": "1280px",
        "margin-mobile": "20px",
        gutter: "24px",
        base: "8px",
      },

      fontFamily: {
        body: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },

      fontSize: {
        "body-md": ["16px", { lineHeight: "24px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em" },
        ],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "600" }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
