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
        'dim-gray' : '#E1E1E1',
        'nero' : '#131313',
        'eerie-black' : '#161616',
        'light-black' : 'rgba(0,0,0,0.85)',
        'card-bg' : 'rgba(19, 19, 19, 0.7)',
        'card-border' : 'rgba(255, 255, 255, 0.01)',
        'golden-yellow' : '#FFDD2B',
        'faded-grey' : '#ADADAD',
        'money-green' : '#1BC622',
        'input-grey' : '#474747',
        'eerie-grey' : '#666666',
        'drop-blue' : '#0057BE',
      },
      fontFamily: {
        primary: ['var(--inter-font)', ...fontFamily.sans],
        serif: ['var(--inter-font)', ...fontFamily.serif],
      },
      boxShadow: {
        nextInverted: '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
        next: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        shammBtnAlt: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        shammBtn: '3px 4px 10px rgba(0, 0, 0, 0.4)',
        card: '3px 4px 40px rgba(0, 0, 0, 0.4)',
        accordion: '3px 4px 15px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        btn: '20px',
      },
      blur: {
        sms: '5px',
      }
    },
  },
  plugins: [],
};
