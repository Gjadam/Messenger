/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'bg-chat' : "url('/public/images/png/bg-chat.png')",
        'radial-gradient-left': 'radial-gradient(rgba(186,230,253,0.6), rgba(186,230,253,0.4), transparent, transparent)',
        'radial-gradient-right': 'radial-gradient(rgba(8,47,73,0.7), rgba(8,47,73,0.5), transparent, transparent)',
      },
      borderWidth : {
        '1' : '1px'
      }
    },
  },
  plugins: [],
}

