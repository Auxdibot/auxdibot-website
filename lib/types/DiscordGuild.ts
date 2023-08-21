import { servers } from "@prisma/client";

export default interface DiscordGuild { id: string, name: string, owner: true, permissions: number, avatar: string, data?: servers, inServer: boolean }