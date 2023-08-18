import { servers } from "@prisma/client";

export default interface DiscordGuild { id: string, name: string, owner: true, permissions: number, icon: string, data?: servers }