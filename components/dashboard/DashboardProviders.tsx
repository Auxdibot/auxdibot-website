"use client";
import DashboardSidebarContainer from '@/components/dashboard/DashboardSidebar';
import { ReactNode } from 'react';

import useSession from '@/lib/hooks/useSession';
import DiscordGuild from '@/lib/types/DiscordGuild';
import Unauthorized from '@/app/unauthorized';
import PageLoading from '@/components/PageLoading';


type ProvidersProps = { children: ReactNode, serverID: string };
export default function DashboardProviders({ children, serverID }: ProvidersProps) {
    const { user, status } = useSession();
  if (!user && status == "loading") return <PageLoading/>;
  if (!user || !user.guilds.find((i: DiscordGuild) => i.id == serverID)) return <Unauthorized/>;
  return (
      <main className={"flex flex-row flex-1 flex-grow w-full"}>
        <DashboardSidebarContainer serverID={serverID}/>
        {children}
      </main>
  );
}