import { Metadata } from 'next'
import DashboardSidebarContainer from '@/components/dashboard/DashboardSidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'The dashboard for the multipurpose Discord utility bot, Auxdibot.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={"flex flex-row flex-1 flex-grow w-full"}><DashboardSidebarContainer/>{children}</main>
  )
}
