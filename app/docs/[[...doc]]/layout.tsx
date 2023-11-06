import DashboardProviders from '@/components/dashboard/DashboardProviders';
import DocumentationSidebarContainer from '@/components/docs/DocumentationSidebar';

export default function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { doc: string | string[] | undefined }
}) {
  
  return <div className={"flex flex-row flex-1 w-full flex-grow"}>
  <DocumentationSidebarContainer doc={params.doc} />
  {children}
  </div>
}
