"use client";
import { PunishmentType } from "@/lib/types/PunishmentType";
import WarnThreshold from "./WarnsThreshold";
import BlacklistedPhrases from "./BlacklistedPhrases";


export default function AutomodPunishment({ server }: { server: { readonly serverID: string, readonly automod_threshold_punishment: PunishmentType; readonly automod_punish_threshold_warns: number; readonly automod_banned_phrases: string[]; readonly automod_banned_phrases_punishment: PunishmentType; }}) {

    return <>
    <div className={"bg-gray-800 shadow-2xl border-2 border-gray-800 rounded-2xl self-stretch w-full max-md:mx-auto"}>
    <h2 className={"bg-gray-900 secondary text-2xl p-4 text-center rounded-2xl rounded-b-none"}>AutoMod Punishents</h2>
    <WarnThreshold server={server}/>
    <BlacklistedPhrases server={server}/>
    </div>
    </>;
}