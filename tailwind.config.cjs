/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './src/**/*.jsx',
  './index.html'],
  theme: {

    fontFamily:{
     rubi:['Rubik','sans-serif']
    },
    extend: {
      backgroundImage: {'background': 'linear-gradient(39deg, rgba(30,60,79,1) 31%, rgba(78,136,136,1) 100%)'},
      boxShadow: {
        '4xl': '2px 3px 15px 5px rgba(248,169,76,0.42)',
      }
    },
  },
  plugins: [require("daisyui")],
}
