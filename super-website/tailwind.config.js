/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        'primary-light': '#FFB866',
        'primary-dark': '#CC6200',
        accent: '#1A365D',
        'accent-light': '#3D6CB3',
        background: '#F9F7F4',
        'background-dark': '#121212',
        text: '#333333',
        'text-light': '#767676',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}