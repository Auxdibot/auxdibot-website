

import DashboardProviders from '@/components/dashboard/DashboardProviders';

export default function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { serverID: string }
}) {
  
  return <DashboardProviders serverID={params.serverID}>{children}</DashboardProviders>
}
