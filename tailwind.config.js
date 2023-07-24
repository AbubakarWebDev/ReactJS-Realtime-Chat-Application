/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  
  theme: {
    extend: {
      colors: {
        main: "#432D41",
        "btn-primary": "#EF4A25",
        "btn-secondry": "#F26E51",
      },
    },
  },

  plugins: [],
}

