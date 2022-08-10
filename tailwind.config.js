/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary-blue-moderate': 'hsl(238, 40%, 52%)',
        'app-primary-red-soft': 'hsl(358, 79%, 66%)',
        'app-primary-blue-grayish-light': 'hsl(239, 57%, 85%)',
        'app-primary-red-pale': 'hsl(357, 100%, 86%)',
        'app-neutral-blue-dark': 'hsl(212, 24%, 26%)',
        'app-neutral-blue-grayish': 'hsl(211, 10%, 45%)',
        'app-neutral-gray-light': 'hsl(223, 19%, 93%)',
        'app-neutral-gray-light-very': 'hsl(228, 33%, 97%)',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            transform: 'translateY(4%)',
            opacity: '0.8',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            visibility: 'visible',
          },
        },
        fadeDown: {
          '0%': {
            transform: 'translateY(-4%)',
            opacity: '0.8',
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            visibility: 'visible',
          },
        },
        appear: {
          '0%': {
            opacity: '0.2',
            visibility: 'hidden',
          },
          '100%': {
            opacity: '1',
            visibility: 'visible',
          },
        },
      },
      animation: {
        fadeUp: 'fadeUp .6s ease-out forwards',
        fadeDown: 'fadeDown .6s ease-out forwards',
        appear: 'appear .6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
