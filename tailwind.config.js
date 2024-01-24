/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'bg-chat' : "url('/public/images/svg/bg-chat.svg')"
      },
      borderWidth : {
        '1' : '1px'
      }
    },
  },
  plugins: [],
}

