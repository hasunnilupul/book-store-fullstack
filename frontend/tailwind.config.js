/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-full-speed': 'bounce-full 0.5s infinite alternate',
        'bounce-full': 'bounce-full 0.75s infinite alternate',
        'bounce-full-slow': 'bounce-full 1s infinite alternate'
      },
      keyframes: {
        'bounce-full': {
          '0%': {
            opacity: '0.1',
            transform: 'translate3d(0, -100%, 0)'
          }
        }
      }
    },
  },
  plugins: [],
}

