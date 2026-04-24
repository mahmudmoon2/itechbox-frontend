/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryOrange: '#FF6B00', // আপনার ওয়েবসাইটের বাটনের জন্য 
        textBlack: '#1A1A1A',
        bgOffWhite: '#FAFAFA',
        bgCloud: '#F0F4F8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // মডার্ন লুকের জন্য
      }
    },
  },
  plugins: [],
}