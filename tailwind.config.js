/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#5b8cff',
        brandAlt: '#7aeea8'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        headline: ['Roboto Condensed', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.35)'
      }
    }
  },
  plugins: []
};
