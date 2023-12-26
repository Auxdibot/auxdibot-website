import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';

export const metadata: Metadata = defaultMetadata;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"dark"} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white bg-gray-950"}>
        <Providers>
          <LayoutNavbar preventCollapse />
          {children}
        </Providers>
      </body>
    </html>
  )
}
