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
      eco2MainColor: '#3500e4',
      eco2HoverColor: '#007297',
      darkHoverColor: '#9ca3af', // Un color para hover en modo claro
      lightColor: '#ffff', // Usar este color para texto sobre fondos oscuros
      darkColor: '#281e4b', // Usar este color para texto sobre fondos claros
      darkBgCard: '#00384b',
      // Agregar cualquier nuevo color que necesites aquí
    }
  }
    // extend: {
    //   colors: {
    //     eco2MainColor: '#3500e4',
    //     eco2HoverColor: '#007297',
    //     lightColor: '#ffff',
    //     lightBgCard: '#fee2e2',
    //     darkColor: '#281e4b',
    //     darkBgCard: '#00384b'
    //   }
    // }
  },
  plugins: [require('@tailwindcss/forms')]
};
