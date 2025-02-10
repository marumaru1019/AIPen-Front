// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // ポップなカラーパレット例
          primary: "#FF6F61",
          secondary: "#6B5B95",
          accent: "#88B04B",
          background: "#F7F7F7",
        },
      },
    },
    plugins: [],
  };
  