/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        doan: {
          blue: "#0055A5", // Màu xanh thanh niên Việt Nam
          lightBlue: "#EBF3FA",
          darkBlue: "#003D75",
          red: "#DA251D", // Màu cờ đỏ
          yellow: "#FFFF00", // Màu sao vàng
        },
      },
    },
  },
  plugins: [],
};

