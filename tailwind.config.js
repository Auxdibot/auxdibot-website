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
        "discord-primary": "#7289DA"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'auxdibot-masthead': "url('/auxdibot-masthead-image.jpg')"
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
