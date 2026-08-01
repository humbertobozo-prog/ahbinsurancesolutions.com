/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': '#002855',
        'secondary': '#005A87',
        'accent': '#FFB81C',
        'light-gray': '#F8FAFC',
        'dark-gray': '#1E293B',
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'shake': 'shake 0.4s ease-in-out',
      },
      keyframes: {
        'fade-in-down': { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'shake': { '0%, 100%': { transform: 'translateX(0)' }, '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' }, '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' } }
      }
    },
  },
  plugins: [],
}
