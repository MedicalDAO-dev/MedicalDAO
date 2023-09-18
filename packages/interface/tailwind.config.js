/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        plaintext: ["Arial"],
      },
      colors: {
        background: { header: "#D5D7E1", main: "#D5D7E1", footer: "#FFF" },
      },
      minWidth: {
        430: "430px",
      },
    },
  },
  plugins: [],
};
