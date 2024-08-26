/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],

    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                'discord-bg': '#323338',
                'discord-primary': '#7289DA',
                'discord-embed': '#2B2D31',
                primary: {
                    100: 'rgb(var(--color-primary-100))',
                    200: 'rgb(var(--color-primary-200))',
                    300: 'rgb(var(--color-primary-300))',
                    400: 'rgb(var(--color-primary-400))',
                    500: 'rgb(var(--color-primary-500))',
                    600: 'rgb(var(--color-primary-600))',
                },
                background: {
                    300: '#120202',
                    200: '#310707',
                    100: '#580F0F',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'auxdibot-masthead':
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.01), transparent 85%),radial-gradient(ellipse at top left, rgba(var(--color-primary-600), 0.5), transparent 30%),radial-gradient(ellipse at top right, rgba(var(--color-primary-600), 0.5), transparent 30%),radial-gradient(ellipse at center right, rgba(var(--color-primary-100), 0.5), transparent 50%),radial-gradient(ellipse at center left, rgba(var(--color-primary-100), 0.5), transparent 50%)',
                'auxdibot-gradient':
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.7) 85%),radial-gradient(ellipse at center left, rgba(var(--color-primary-600), 0.5), transparent 40%),radial-gradient(ellipse at center right, rgba(var(--color-primary-600), 0.5), transparent 40%),radial-gradient(ellipse at bottom right, rgba(var(--color-primary-100), 0.5), transparent 50%),radial-gradient(ellipse at bottom left, rgba(var(--color-primary-100), 0.5), transparent 50%)',
                'auxdibot-premium-masthead':
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1) 85%),radial-gradient(ellipse at top left, #fef08a80, transparent 30%),radial-gradient(ellipse at top right, #fef08a80, transparent 30%),radial-gradient(ellipse at center right, #eab30880, transparent 50%),radial-gradient(ellipse at center left, #eab30880, transparent 50%)',
            },
            animation: {
                incorrect: 'shake 300ms linear 0s 1',
                fadeIn: 'fadeIn 1.25s ease-in-out 0s 1 forwards',
                colorPicker: 'fadeIn 0.25s ease-in-out 0s 1 forwards',
                fadeRight: 'fadeRight 0.5s ease-out 0s 1 forwards',
                fadeUp: 'fadeUp 0.5s ease-out 0s 1 forwards',
                mastheadCycleDown:
                    'mastheadCycleDown 1990ms ease-in-out infinite 2000ms',
                mastheadCycleUp:
                    'mastheadCycleUp 1990ms ease-in-out infinite 2000ms',
            },
            fontFamily: {
                'josefin-sans': 'var(--font-josefin-sans)',
                bauhaus: "'Bauhaus 93', sans-serif",
                'josefin-slab': 'var(--font-josefin-slab)',
                'playfair-display': 'var(--font-playfair-display)',
                oswald: 'var(--font-oswald)',
                roboto: 'var(--font-roboto)',
                lato: 'var(--font-lato)',
                montserrat: 'var(--font-montserrat)',
                'open-sans': 'var(--font-open-sans)',
                inter: 'var(--font-inter)',
                raleway: 'var(--font-raleway)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
};
