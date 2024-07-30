import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';
import fonts from '../fonts';

export const metadata: Metadata = defaultMetadata;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${Object.keys(fonts).map((i) => fonts[i as keyof typeof fonts].variable).join(' ')}`} style={{ colorScheme: "dark" }}>
      <body>
        <Providers>
          <LayoutNavbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
