/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        main: "#432D41",
        gray: "#EBE8EA",
        "gray-font": "#8b7886",
        "gray-hover": "#F6F6F6",
        "gray-secondry": "#9A98A0",
        "btn-primary": "#EF4A25",
        "btn-secondry": "#F26E51",
      },
    },
  },
  plugins: [],
};
