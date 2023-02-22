const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dim-gray' : '#696969',
        'next-gray' : '#696969'
      },
      fontFamily: {
        primary: ['var(--inter-font)', ...fontFamily.sans],
        serif: ['var(--inter-font)', ...fontFamily.serif],
      },
      boxShadow: {
        nextInverted: '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
        next: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
