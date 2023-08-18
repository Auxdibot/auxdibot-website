import Image from "next/image";
import { motion } from 'framer-motion';
import { useMediaQuery } from "react-responsive";
export default function Features() {
    return (<ul className={"flex flex-col gap-10 my-20 p-7 max-lg:overflow-hidden"}>
        <li>
            <Feature features={[
                "A powerful punishment suite, featuring every command you will need for essential moderation duties.", 
                // add this when automod is finished "A fleshed out automod system which automatically logs actions on the server and automatically deals out punishments for specific infractions.", 
                "Manage or view an extensive punishment history with the /punishment command.",
                "Manage users on the fly with an easy to navigate Discord embed and model using the /user command.",
                "No mute role required! Auxdibot comes ready to use out of the box, with mutes utilizing Discord's timeout system."
                ]} 
                description={"Handle punishments on your server with Auxdibot! Moderators with Administrator or the proper permissions can warn, kick, mute, or ban members from their server. Auxdibot also features an extensive punishment history, which can be viewed and edited!"} 
                title={"Punishments"} imageUrl={"/features/punishments.png"}/>
        </li>
        <li>
            <Feature features={[
                "Auxdibot will provide the details for every action logged, including punishment information and the date!", 
                "Administrators can set a log channel where the Discord bot will send logs, taking the form of an organized embed.", 
                "Auxdibot logs everything. Joining and leaving, punishments, settings changes, message events, and more!"
                ]} 
                description={"Auxdibot features an extensive logging system, logging every Discord and Auxdibot related action!"} 
                title={"Logging"} imageUrl={"/features/logging.png"}/>
        </li>
        <li>
            <Feature features={[
                "Allow specific users to use commands with permission overrides.", 
                "Administrators can allow users with specific roles to execute any command.", 
                "Permission overrides can be edited or viewed under the sole /permissions command.",
                "Manage role and user permissions in bulk on Auxdibot's dashboard site."
                ]} 
                description={"Auxdibot features an expansive and customizable permission system. Every command has its own permission. You can allow or deny permission to execute Auxdibot's commands for any role or user on your server using Auxdibot's permission overrides."} 
                title={"Permissions"} imageUrl={"/features/permissions.png"}/>
        </li>
        <li>
            <Feature features={[
                "Schedule reminders and messages using Auxdibot's /schedule command! Admins can specify the duration and times to perform the schedule.", 
                "Write detailed announcements or rule embeds for your server using Auxdibot's embed customization tools, which can customize embeds to the tiniest detail.", 
                "Once you have setup a join/leave channel with /settings join_leave_channel, you can create a custom join/leave message for your server using Auxdibot's /join and /leave commands!",
                "You can setup a message to directly message to members joining your server using the /join_dm command!",
                "Create reaction role messages with a custom embed (or use Auxdibot's default reaction role embed) using /reaction_role!"
                ]} 
                description={"Auxdibot can interact with your server in various ways. Using Auxdibot, administrators can schedule messages, set a join/leave message for their server, and directly message members when they join their server. Utilizing Auxdibot's custom embed system, you can fully customize the embeds that Auxdibot is sending."} 
                title={"Messages"} imageUrl={"/features/messages.png"}/>
        </li>
        <li>
            <Feature features={[
                "Award or remove a member's XP with /levels award_xp and /levels remove_xp.", 
                "Reset a member's XP with /levels reset.", 
                "Customize the message XP for your server with /levels message_xp.",
                "Create custom level rewards with /levels add_reward!"
                ]} 
                description={"Incentivize members to chat on your server with Auxdibot's leveling system! Members can earn roles on your server by leveling up. XP can be awarded or removed, and message XP can be tweaked, making Auxdibot's leveling system very customizable."} 
                title={"Levels"} imageUrl={"/features/levels.png"}/>
        </li>
        <li>
            <Feature features={[
                "Receive feedback from your members through suggestion threads & reactions!", 
                "Customize the suggestion reactions! Auxdibot will automatically apply added reactions on new suggestions.", 
                "Respond to your members suggestions descriptively using Auxdibot's /suggestions add/consider/approve/consider.",
                "Direct suggestion updates to a specific channel using Auxdibot's /suggestions update_channel command!"
                ]} 
                description={"Receive fast and accurate feedback for your server using Auxdibot's suggestions system! Auxdibot creates a thread for every suggestion (can be disabled) and will automatically create reactions, which can be added or removed by an admin, for members to share their feedback. Admins can mark suggestions as approved, considered, denied, or added. Auxdibot will also keep track of suggestion bans and not allow members to submit suggestions if they are banned."} 
                title={"Suggestions"} imageUrl={"/features/suggestions.png"}/>
        </li>
        <li>
            <Feature features={[
                "Create reaction roles for members to react to to obtain roles on your server!", 
                "Reaction roles are fully customizable through Auxdibot's custom embed system.", 
                "Give every member on your server a role, or take a role from everyone with /massrole!",
                "Setup a mute role automatically with /settings mute_role!"
                ]} 
                description={"Create custom reaction roles or give members roles in mass using Auxdibot's role commands!"} 
                title={"Roles"} imageUrl={"/features/roles.png"}/>
        </li>
        <li>
            <Feature features={[
                "Change the starboard reaction to ANY Discord emoji for extra fun!", 
                "Admins can set the total reaction count needed to send a message to the starboard, allowing Auxdibot's starboard to be scaled for any server!", 
                "Auxdibot automatically embeds any attachments sent with a starred message, to allow members to see additional context for any message!",
                "Additionally, Auxdibot also automatically embeds the message that the starred message was quoting, if there is one."
                ]} 
                description={"Highlight the funniest messages on your server with Auxdibot's starboard! When a message recieves enough stars (or another reaction specified by an admin), the message gets highlighted in the starboard channel for that server!"} 
                title={"Starboard"} imageUrl={"/features/starboard.png"}/>
        </li>
    </ul>)
}
type FeatureProps = { features?: string[]; description: string; title: string; imageUrl: string; }
export function Feature({ features, description, title, imageUrl }: FeatureProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 720px)' })
    return (<div className={"w-full relative flex justify-center items-center z-10 overflow-hidden rounded-2xl hover:scale-105 transition-all border-2 border-transparent hover:border-orange-500"}>
        <div className={"flex flex-grow flex-1 flex-col gap-2 max-md:gap-10 max-md:text-center md:p-5 max-md:py-5 bg-gray-950 bg-opacity-70"}>
            <motion.h1 initial={{ ...(isMobile ? { translateY: "-2rem" } : { translateX: "-8rem" }), opacity: 0 }} whileInView={{ translateX: "0", translateY: "0rem", opacity: 1 }} viewport={{ once: true }} className={"header text-5xl max-sm:text-4xl"}>{title}</motion.h1>
            <p className={"secondary bg text-xl max-sm:text-md"}>{description}</p>
            <ul className={"list-disc max-md:list-none max-md:gap-5 md:pl-8 flex flex-col text text-lg max-sm:text-sm"}>
                {features?.map((i, index) => <li key={index}>{i}</li>)}
            </ul>
        </div>
        <div className={"absolute flex-grow-0 flex-shrink-0- -z-10 min-w-full min-h-full blur-sm left-0 bg-discord-message"}>
            {imageUrl ? <Image className={"absolute w-full md:object-cover max-md:scale-[300%] object-scale-down max-md:translate-x-72 md:object-left"} src={imageUrl} fill alt={title + " image"} /> : ""}
        </div>
    </div>)
}