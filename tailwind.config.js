module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': 'url("./image/menu.jpg")',
        'hutan':'url("./image/hutan.jpg")',
        'petir': 'url("./image/petir.png")',
        'hujan':'url("./image/rain.png")'
      },
      fontFamily: {
        'zila' : ['Zilla Slab'],
      },
    },
  },
  plugins: [],
}
