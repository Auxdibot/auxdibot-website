

import DashboardProviders from '@/components/dashboard/DashboardProviders';
import '@/styles/global.scss'

export default function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { serverID: string }
}) {
  
  return <DashboardProviders serverID={params.serverID}>{children}</DashboardProviders>
}
