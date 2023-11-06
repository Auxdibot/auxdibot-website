import Providers from '@/components/Providers'
import '../styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';

export const metadata: Metadata = {
  title: 'Auxdibot',
  description: 'The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.',
  themeColor: "#ee884b",
  metadataBase: new URL(process.env.SITE_URL || `https://localhost:${process.env.PORT || 3000}`),
  icons: "/icon.png",
  openGraph: {
    type: "website",
    title: "Auxdibot",
    siteName: "Auxdibot",
    countryName: "United States",
    description: "The official website, blog, and dashboard for the multipurpose Discord utility bot, Auxdibot.",
    url: "https://bot.auxdible.me",
    images: "/icon.png"
  },
  viewport: {
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    width: "device-width"
  }
  
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"dark"} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white"}>
        <Providers>
          <LayoutNavbar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
