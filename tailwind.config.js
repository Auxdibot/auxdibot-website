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
        "discord-bg": "#323338",
        "discord-primary": "#7289DA",
        "discord-embed": "#2B2D31"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'auxdibot-masthead': "url('/auxdibot-masthead-image.jpg')"
      },
      animation: {
        'incorrect': "shake 300ms linear 0s 1",
        'fadeIn': 'fadeIn 1.25s ease-in-out 0s 1 forwards',
        'colorPicker': 'fadeIn 0.25s ease-in-out 0s 1 forwards'
      },
      fontFamily: {
        'josefin-sans': "'Josefin Sans', sans-serif",
        'roboto': "'Roboto', sans-serif",
        'lato': "'Lato', sans-serif",
        'montserrat': "'Montserrat', sans-serif"
      }
    },
  },
  plugins: [],
}
