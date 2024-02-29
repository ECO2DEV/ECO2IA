/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "selector",
  theme: {

  plugins: [require("@tailwindcss/forms")],
  darkMode: 'selector',
  theme: {
    animation: {
      "text-gradient": "text-gradient 1.5s linear infinite",
      "background-shine": "background-shine 2s linear infinite",
    },
    keyframes: {
      "text-gradient": {
        to: {
          backgroundPosition: "200% center",
        },
      },
      "background-shine": {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
    },
  },
    extend: {
      colors: {
        eco2MainColor: '#21c284', // eco2-green
        eco2HoverColor: '#21c284a8',
        lightColor: '#f0fdf4', // bg-green-50
        lightBgCard: '#fee2e2', // bg-red-100
        darkColor: '#020617', // bg-slate-950 // background
        darkBgCard: '#1f2937' // bg-slate-800
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
