import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata, Viewport } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';

export const metadata: Metadata = {
  title: "Auxdibot Premium",
  description: "Auxdibot premium is a paid subscription to Auxdibot, granding subscribers access to the latest beta features, increased limits, various features, swift communication with our developers, and a unique role on our server!",
  icons: [
    {
      url: "/premium.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
  openGraph: {
    title: "Auxdibot Premium",
    description: "Auxdibot premium is a paid subscription to Auxdibot, granting subscribers access to the latest beta features, increased limits, various features, swift communication with our developers, and a unique role on our server!",
    images: "/premium.png"
  },
};

export const viewport: Viewport = {
  themeColor: "#eab308",
  colorScheme: "dark",
}
export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"dark"} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white"}>
        <Providers>
          <LayoutNavbar premiumIcon />
          {children}
        </Providers>
      </body>
    </html>
  )
}
