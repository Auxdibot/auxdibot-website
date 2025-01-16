import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
    title: 'Auxdibot',
    description:
        'The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.',
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_URL ||
            `https://localhost:${process.env.PORT || 3000}`
    ),
    icons: ['/logo.png', '/favicon.ico'],
    openGraph: {
        type: 'website',
        title: 'Auxdibot',
        siteName: 'Auxdibot',
        countryName: 'United States',
        description:
            'The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.',
        url: 'https://auxdibot.xyz',
        images: '/logo.png',
    },
};
