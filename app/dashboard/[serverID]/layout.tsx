

import DashboardProviders from '@/components/dashboard/DashboardProviders';
import { Metadata } from 'next'

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
  
  return <DashboardProviders serverID={params.serverID}>{children}</DashboardProviders>
}
