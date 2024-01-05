import DocumentationSidebarContainer from '@/components/docs/DocumentationSidebar';


import Providers from '@/components/Providers'
import '@/styles/global.scss'
import { Metadata } from 'next'
import LayoutNavbar from '@/components/navbar/LayoutNavbar';
import { defaultMetadata } from '@/lib/constants/defaultMetadata';

export const metadata: Metadata = defaultMetadata;


export default function DocumentationLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { doc: string }
}) {
  return (
    <html lang="en" className={"dark"} style={{ colorScheme: "dark" }}>
      <body className={"flex flex-col min-h-screen text-white"}>
        <Providers>
          <LayoutNavbar preventCollapse />
          <div className={"flex flex-row flex-1 w-full flex-grow"}>
          <DocumentationSidebarContainer doc={params.doc} />
          {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
