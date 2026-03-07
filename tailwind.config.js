/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        "genii-bg": "#363538",
        "genii-bg-deep": "#2E2D30",
        "genii-bg-deeper": "#242326",
        "genii-light": "#EBE6E1",
        "genii-accent": "#7B1723",
        "genii-muted": "#C8C1BB",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(123, 23, 35, 0.25)",
        soft: "0 20px 45px rgba(0, 0, 0, 0.35)",
        card: "0 18px 40px rgba(0, 0, 0, 0.4)",
        edge: "0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 10% 20%, rgba(123, 23, 35, 0.35), transparent 45%)",
        "soft-glow": "radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.08), transparent 55%)",
        "accent-fade": "linear-gradient(135deg, rgba(123, 23, 35, 0.35), transparent 55%)",
      },
      borderRadius: {
        xl: "1.25rem",
        '2xl': "1.75rem",
        '3xl': "2rem",
      },
    },
  },
  plugins: [],
};
