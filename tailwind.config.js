/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "discord-bg": "#323338",
        "discord-primary": "#7289DA",
        "discord-embed": "#2B2D31",
        "primary": {
          100: "rgb(var(--color-primary-100))",
          200: "rgb(var(--color-primary-200))",
          300: "rgb(var(--color-primary-300))",
          400: "rgb(var(--color-primary-400))",
          500: "rgb(var(--color-primary-500))",
          600: "rgb(var(--color-primary-600))"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'auxdibot-masthead': "linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1) 85%),radial-gradient(ellipse at top left, rgba(var(--color-primary-600), 0.5), transparent 30%),radial-gradient(ellipse at top right, rgba(var(--color-primary-600), 0.5), transparent 30%),radial-gradient(ellipse at center right, rgba(var(--color-primary-100), 0.5), transparent 50%),radial-gradient(ellipse at center left, rgba(var(--color-primary-100), 0.5), transparent 50%)",
        'auxdibot-gradient': "linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.7) 85%),radial-gradient(ellipse at center left, rgba(var(--color-primary-600), 0.5), transparent 40%),radial-gradient(ellipse at center right, rgba(var(--color-primary-600), 0.5), transparent 40%),radial-gradient(ellipse at bottom right, rgba(var(--color-primary-100), 0.5), transparent 50%),radial-gradient(ellipse at bottom left, rgba(var(--color-primary-100), 0.5), transparent 50%)",
      },
      animation: {
        'incorrect': "shake 300ms linear 0s 1",
        'fadeIn': 'fadeIn 1.25s ease-in-out 0s 1 forwards',
        'colorPicker': 'fadeIn 0.25s ease-in-out 0s 1 forwards',
        'fadeRight': 'fadeRight 0.5s ease-out 0s 1 forwards',
        'fadeUp': 'fadeUp 0.5s ease-out 0s 1 forwards',
      },
      fontFamily: {
        'josefin-sans': "'Josefin Sans', sans-serif",
        'bauhaus': "'Bauhaus 93', sans-serif",
        'josefin-slab': "'Josefin Slab', sans-serif",
        'playfair-display': "'Playfair Display', sans-serif",
        'oswald': "'Oswald', sans-serif",
        'roboto': "'Roboto', sans-serif",
        'lato': "'Lato', sans-serif",
        'montserrat': "'Montserrat', sans-serif",
        'open-sans': "'Open Sans', sans-serif",
        'inter': "'Inter', sans-serif",
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
