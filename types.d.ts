import DiscordGuild from "./lib/types/DiscordGuild";
declare module 'next-auth' {
    interface Session {
      user?: DefaultUser & {
        guilds?: DiscordGuild[];
      };
    }
  }
declare module 'next-auth/jwt/types' {
    interface JWT {
        guilds?: DiscordGuild[];
    }
}