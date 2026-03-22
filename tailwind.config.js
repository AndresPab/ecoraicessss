/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'eco-primary': '#2D5A27',
        'eco-mid': '#4A8C3F',
        'eco-light': '#7DBF6E',
        'eco-pale': '#D6EDCF',
        'eco-cream': '#F7F5EF',
        'eco-gold': '#C8963C',
        'eco-gold-light': '#F0C96B',
        'eco-dark': '#1A2E15',
        'eco-gray': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
