"use client";

import { Metadata } from 'next'
import DashboardSidebarContainer from '@/components/dashboard/DashboardSidebar';
import { useState } from 'react';
import DashboardSidebarContext from '@/context/DashboardSidebarContext';
import Action from '@/components/dashboard/Action';
import { DashboardActionPrompt } from '@/lib/types/DashboardActionPrompt';
import DashboardActionContext from '@/context/DashboardActionContext';

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
  const [page, setCurrentPage] = useState<string>("home");
  const [action, setAction] = useState<DashboardActionPrompt | null>(null)
  return (
    <DashboardSidebarContext.Provider value={{ page, setCurrentPage }}>
      <DashboardActionContext.Provider value={{ action, setAction }}>
      <main className={"flex flex-row flex-1 flex-grow w-full"}>
        <DashboardSidebarContainer serverID={params.serverID}/>
        {children}
      </main>
      <Action/>
      </DashboardActionContext.Provider>
      </DashboardSidebarContext.Provider>
  )
}
