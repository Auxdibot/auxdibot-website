import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';
import fonts from '@/app/fonts';

export const metadata: Metadata = defaultMetadata;

export const viewport = {
  themeColor: "#ee884b",
  colorScheme: "dark",
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode,
  params: { doc: string }
}) {
  return (
    <html lang="en" className={`dark ${Object.keys(fonts).map((i) => fonts[i as keyof typeof fonts].variable).join(' ')}`} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white"}>
        <Providers>
          <LayoutNavbar preventCollapse />
          <div className={"flex flex-row flex-1 w-full flex-grow"}>
          
          {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
