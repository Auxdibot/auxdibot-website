import prisma from "@/lib/prisma";
import DiscordGuild from "@/lib/types/DiscordGuild";
import NextAuth, { AuthOptions } from "next-auth"
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
const isDiscordProfile = (profile: any): profile is DiscordProfile => {
  return profile?.username
}
if (!process.env.DISCORD_BOT_CLIENT_ID || !process.env.OAUTH2_CLIENT_SECRET) {
  throw new Error("A client id AND client secret need to be specified!");
}
const authOptions = <AuthOptions>{
  providers: [DiscordProvider({
    clientId: process.env.DISCORD_BOT_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET, 
    authorization: {
      params: { scope: 'identify guilds' }
    }   
  })],
  callbacks: {
    async session({ token, session }) {
        if (token.guilds && session.user) session.user.guilds = token.guilds;
        return session;
    },

    async jwt({ token, user, profile, account }) {
      
      if (isDiscordProfile(profile) && account?.access_token) {
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${account.access_token}`)
        let guilds: DiscordGuild[] = await fetch("https://discord.com/api/users/@me/guilds", { headers }).then(async (data) => 
        await data.json().then((data) => data.filter((i: DiscordGuild) => i.owner || i.permissions&0x8)).catch(() => [])).catch(() => []);
        token.guilds = guilds;
      }
      return token;
    }
  },
  pages: {
     signIn: "/auth/signin",
     signOut: "/auth/signout"
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }