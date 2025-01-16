import Providers from '@/components/Providers';
import '@/styles/global.scss';
import { Metadata } from 'next';
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';
import fonts from '@/app/fonts';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            suppressHydrationWarning
            className={`dark ${Object.keys(fonts)
                .map((i) => fonts[i as keyof typeof fonts].variable)
                .join(' ')}`}
            style={{ colorScheme: 'dark' }}
        >
            <body
                className={
                    'flex min-h-screen flex-col text-white dark:bg-black'
                }
            >
                <Providers>
                    <LayoutNavbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
