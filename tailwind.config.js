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
    plugins: [require('@tailwindcss/forms')],
    darkMode: 'selector',
    theme: {
      animation: {
        'text-gradient': 'text-gradient 1.5s linear infinite',
        'background-shine': 'background-shine 2s linear infinite'
      },
      keyframes: {
        'text-gradient': {
          to: {
            backgroundPosition: '200% center'
          }
        },
        'background-shine': {
          from: {
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
        }
      }
    },
    extend: {
      colors: {
        eco2MainColor: '#01c38d',
        eco2HoverColor: '#696e79',
        darkHoverColor: '#132d46', // Un color para hover en modo claro
        lightColor: '#ffff', // Usar este color para texto sobre fondos oscuros
        darkColor: '#191e29', // Usar este color para texto sobre fondos claros
        darkBgCard: '#00384b'
        // Agregar cualquier nuevo color que necesites aquí
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
