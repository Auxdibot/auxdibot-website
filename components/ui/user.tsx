import Image from "next/image";
import { useQuery } from "react-query";

export function User({ userID }: { userID: string }) {
    const userData = useQuery(["user", userID], async () => await fetch(`/bot/v1/user?id=${userID}`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined)).data;
    return (<span className={"flex gap-2 items-center"}>
    {userData?.avatar ? <Image src={`https://cdn.discordapp.com/avatars/${userID}/${userData.avatar}.png`} width={24} height={24} className={"rounded-full max-md:hidden"} alt={`${userData.username}'s avatar`}/> : ""}
    {userData ? userData.username : "Unknown"}
    </span>);
}   