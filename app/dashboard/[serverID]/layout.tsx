import { Metadata } from 'next'
import DashboardSidebarContainer from '@/components/dashboard/DashboardSidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'The dashboard for the multipurpose Discord utility bot, Auxdibot.',
};


export default function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { serverID: string }
}) {
  return (
    <main className={"flex flex-row flex-1 flex-grow w-full"}><DashboardSidebarContainer serverID={params.serverID}/>{children}</main>
  )
}
