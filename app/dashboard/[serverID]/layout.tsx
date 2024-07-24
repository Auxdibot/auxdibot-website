import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';
import fonts from '@/app/fonts';

export const metadata: Metadata = defaultMetadata;



export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { serverID: string }
}) {
  return (
    <html lang="en" className={`dark ${Object.keys(fonts).map((i) => fonts[i as keyof typeof fonts].variable).join(' ')}`} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white bg-black"}>
        <Providers>
          <LayoutNavbar preventCollapse serverID={params.serverID} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
