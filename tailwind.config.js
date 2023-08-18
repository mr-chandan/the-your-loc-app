/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "media",
  theme: {
    colors: {
      dark: '#09090B',
      primary: "hsl(0 0% 98%)",
      primaryforeground: "hsl(240 5.9% 10%)",
      lighttext:"#8A8A93",
      error:"#7F1D1C"
    },
    fontFamily: {
      'inter': ['Inter']

    }
  }
}
