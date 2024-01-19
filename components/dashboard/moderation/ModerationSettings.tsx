"use client";

import MuteRole from "./MuteRole";
import PunishmentsSendModerator from "./PunishmentsSendModerator";
import PunishmentsSendReason from "./PunishmentsSendReason";

export default function ModerationSettings({ server }: { server: { readonly serverID: string, readonly mute_role: string, readonly punishment_send_reason: boolean, readonly punishment_send_moderator: boolean }}) {
    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl h-fit flex-1 w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>Moderation Settings</h2>
    { server && <MuteRole server={server}/>}
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
    </div>
    </>;
}