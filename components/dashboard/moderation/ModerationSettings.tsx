"use client";

import { PunishmentType } from "@/lib/types/PunishmentType";
import WarnThreshold from "./WarnsThreshold";
import MuteRole from "./settings/MuteRole";
import PunishmentsSendModerator from "./settings/PunishmentsSendModerator";
import PunishmentsSendReason from "./settings/PunishmentsSendReason";
import ReportsSettings from "./reports/ReportsSettings";
import { Separator } from "@/components/ui/separator";

export default function ModerationSettings({ server }: { server: { readonly serverID: string, readonly mute_role: string, readonly punishment_send_reason: boolean, readonly punishment_send_moderator: boolean, readonly reports_channel: string, readonly report_role: string, readonly automod_threshold_punishment: PunishmentType, readonly automod_punish_threshold_warns: number }}) {
    return <>
    <div className={"shadow-2xl border-2 border-gray-800 rounded-2xl h-fit flex-1 w-full max-md:mx-auto"}>
    <h2 className={"secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Moderation Settings</h2>
    { server && <MuteRole server={server}/>}
    <Separator className="my-4 max-w-md mx-auto"/>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center mt-4"}>Punishment Settings</h3>
    <div className={'flex max-md:flex-col items-center justify-center gap-8 my-4'}>
        <span className={'flex-1 flex flex-col justify-center items-center gap-2'}>
            <label className={"text-xl font-open-sans"}>Send Reason</label>
            {server && <PunishmentsSendReason server={server} /> }
        </span>
        <span className={'flex-1 flex flex-col justify-center items-center gap-2'}>
            <label className={"text-xl font-open-sans"}>Send Moderator</label>
            {server && <PunishmentsSendModerator server={server} /> }
        </span>
    </div>
    <Separator className="my-4 max-w-md mx-auto"/>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center mt-4"}>Warn Threshold</h3>
    <WarnThreshold server={server}/>
    <Separator className="my-4 max-w-md mx-auto"/>
    <h3 className={"text-2xl font-open-sans text-gray-300 text-center mt-4"}>Reports Settings</h3>
    <ReportsSettings server={server} />
    </div>
    </>;
}