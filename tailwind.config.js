// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // pagesディレクトリも追加
    "./public/**/*.html", // publicディレクトリ内のHTMLファイルも追加
  ],
  theme: {
    extend: {
      colors: {
        // ポップなカラーパレット例
        background: "#F7F7F7",
        primary: "#FF6F61",
        secondary: "#6B5B95",
        accent: "#88B04B",
      },
    },
  },
  plugins: [],
};