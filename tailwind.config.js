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
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' }
                  },
                  marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' }
                  }
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
                'discord-text': '#dcddde',
                'discord-embed-border': '#202225',
                'discord-link': '#00aff4',
                'discord-app-tag': '#5865f2',
                'discord-muted': '#72767d',
                'discord-quote': '#4f545c',
                'discord-code': '#2b2d31',
                'discord-code-border': '#1e1f22',
                'discord-mention': '#5865f24d',
                'discord-mention-text': '#e3e7f8',
                'discord-highlight': '#5865f2',
                'discord-highlight-text': '#e3e7f8'
            },
            gridTemplateColumns: {
                thumbnail: 'auto min-content',
                auto: 'auto',
            },
            gridColumn: {
                'span-field': '1 / 13',
                'span-inline-1': '1 / 5',
                'span-inline-2': '5 / 9',
                'span-inline-3': '9 / 13',
                'span-image': '1 / 3',
                'span-thumbnail': '2 / 2',
            },
            gridRow: {
                'span-thumbnail': '1 / 8',
            },
            gridTemplateRows: {
                auto: 'auto',
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
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                marquee: 'marquee 30s linear infinite',
                marquee2: 'marquee2 30s linear infinite'
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
    safelist: [
        'col-span-inline-1',
        'col-span-inline-2',
        'col-span-inline-3',
        'col-span-field',
        'hover:text-white',
        'w-1',
        'bg-discord-quote',
        'pl-3',
        'border-discord-code-border',
        'text-yellow-500',
        'bg-discord-code',
        'discord-mention'
    ],
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
};
