/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        eco2MainColor: '#21c284', // eco2-green
        eco2HoverColor: '#21c284a8',
        lightColor: '#f0fdf4', // bg-green-50
        lightBgCard: '#fee2e2', // bg-red-100
        darkColor: '#020617', // bg-slate-950
        darkBgCard: '#1f2937' // bg-slate-800
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
