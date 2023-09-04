"use client";
import DashboardSidebarContainer from '@/components/dashboard/DashboardSidebar';
import { useState, ReactNode } from 'react';
import DashboardSidebarContext from '@/context/DashboardSidebarContext';
import Action from '@/components/dashboard/Action';
import { DashboardActionPrompt } from '@/lib/types/DashboardActionPrompt';
import DashboardActionContext from '@/context/DashboardActionContext';
import useSession from '@/lib/hooks/useSession';
import DiscordGuild from '@/lib/types/DiscordGuild';
import Unauthorized from '@/app/unauthorized';
import PageLoading from '@/components/PageLoading';


type ProvidersProps = { children: ReactNode, serverID: string };
export default function DashboardProviders({ children, serverID }: ProvidersProps) {
    const { user, status } = useSession();
  const [page, setCurrentPage] = useState<string>("home");
  const [action, setAction] = useState<DashboardActionPrompt | null>(null)
  if (!user && status == "loading") return <PageLoading/>;
  if (!user || !user.guilds.find((i: DiscordGuild) => i.id == serverID)) return <Unauthorized/>;
  return (
    <DashboardSidebarContext.Provider value={{ page, setCurrentPage }}>
      <DashboardActionContext.Provider value={{ action, setAction }}>
      <main className={"flex flex-row flex-1 flex-grow w-full"}>
        <DashboardSidebarContainer serverID={serverID}/>
        {children}
      </main>
      <Action/>
      </DashboardActionContext.Provider>
      </DashboardSidebarContext.Provider>
  );
}