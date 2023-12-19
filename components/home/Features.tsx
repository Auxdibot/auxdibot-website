import Image from "next/image";
import { motion } from 'framer-motion';
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
export default function Features() {
    return (<ul className={"flex flex-col gap-28 xs:p-2 max-lg:overflow-hidden"}>
        <li>
            <Feature features={[
                "A fleshed out automod system which automatically logs actions on the server and automatically deals out punishments for specific infractions.", 
                "Manage or view an extensive punishment history with the /punishment command.",
                "Manage users on the fly with an easy to navigate Discord embed and model using the /user command.",
                ]} 
                title={"Punishments"} videoUrl={"/features/auxdibot-punishment.mp4"}/>
        </li>
        <li>
            <Feature features={[
                "Auxdibot will provide the details for every action logged, including punishment information and the date!", 
                "Administrators can set a log channel where the Discord bot will send logs, taking the form of an organized embed.", 
                "Auxdibot logs everything. Joining and leaving, punishments, settings changes, message events, and more!"
                ]} 
                title={"Logging"} videoUrl={"/features/auxdibot-logging.mp4"} left/>
        </li>
        <li>
            <Feature features={[
                "Administrators can allow users with specific roles to execute any command.", 
                "Permission overrides can be edited or viewed under the sole /permissions command.",
                "Manage role and user permissions in bulk on Auxdibot's dashboard site."
                ]} 
                title={"Permissions"} videoUrl={"/features/auxdibot-permissions.mp4"}/>
        </li>
        <li>
            <Feature features={[
                "Schedule reminders and messages using Auxdibot's /schedule command! Admins can specify the duration and times to perform the schedule.", 
                "Write detailed announcements or rule embeds for your server using Auxdibot's embed customization tools, which can customize embeds to the tiniest detail.", 
                ]} 
                title={"Messages"} videoUrl={"/features/auxdibot-messages.mp4"} left/>
        </li>
        <li>
            <Feature features={[
                "Award or remove a member's XP with /levels award_xp and /levels remove_xp.", 
                "Reset a member's XP with /levels reset.", 
                "Customize the message XP for your server with /levels message_xp.",
                "Create custom level rewards with /levels add_reward!"
                ]} 
                title={"Levels"} videoUrl={"/features/auxdibot-levels.mp4"}/>
        </li>
        <li>
            <Feature features={[
                "Receive feedback from your members through suggestion threads & reactions!", 
                "Customize the suggestion reactions! Auxdibot will automatically apply added reactions on new suggestions.", 
                "Respond to your members suggestions descriptively using Auxdibot's /suggestions add/consider/approve/consider.",
                "Direct suggestion updates to a specific channel using Auxdibot's /suggestions update_channel command!"
                ]}
                title={"Suggestions"} videoUrl={"/features/auxdibot-suggestions.mp4"} left/>
        </li>
        <li>
            <Feature features={[
                "Create reaction roles for members to react to to obtain roles on your server!", 
                "Reaction roles are fully customizable through Auxdibot's custom embed system.", 
                "Give every member on your server a role, or take a role from everyone with /massrole!",
                "Setup a mute role automatically with /settings mute_role!"
                ]} 

                title={"Roles"} videoUrl={"/features/auxdibot-roles.mp4"}/>
        </li>
        <li>
            <Feature features={[
                "Change the starboard reaction to ANY Discord emoji for extra fun!", 
                "Admins can set the total reaction count needed to send a message to the starboard, allowing Auxdibot's starboard to be scaled for any server!", 
                "Auxdibot automatically embeds any attachments sent with a starred message, to allow members to see additional context for any message!",
                "Additionally, Auxdibot also automatically embeds the message that the starred message was quoting, if there is one."
                ]} 
                title={"Starboard"} videoUrl={"/auxdibot-video.mp4"} left/>
        </li>
        <li>
            <Feature features={[
                "Once you have setup a join/leave channel with /settings join_leave_channel, you can create a custom join/leave message for your server using Auxdibot's /join and /leave commands!",
                "You can setup a message to directly message to members joining your server using the /join_dm command!",
                ]} 
                
                title={"Greetings"} videoUrl={"/features/auxdibot-greetings.mp4"}/>
        </li>
    </ul>)
}
type FeatureProps = { features?: string[]; title: string; videoUrl?: string; docsLink?: string; left?:boolean; }
export function Feature({ features, title, videoUrl, docsLink, left }: FeatureProps) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    return (<div className={`w-full flex ${left ? "flex-row-reverse" : ""} max-md:flex-col justify-center items-center z-10  transition-all gap-12`}>
        <div className={"flex flex-col gap-2 max-md:gap-10 max-md:text-center px-1.5 flex-1"}>
            <motion.h1 initial={{ ...(isMobile ? { translateY: "-2rem" } : { translateX: "-8rem" }), opacity: 0 }} whileInView={{ translateX: "0", translateY: "0rem", opacity: 1 }} viewport={{ once: true }} className={"header lowercase text-5xl"}>{title} {docsLink ? <Link href={docsLink} className={"font-montserrat text-xl text-gray-500"}>[docs]</Link> : ""}</motion.h1>
            
            <ul className={"list-disc max-md:list-none gap-2 max-md:gap-5 md:pl-3 flex flex-col text text-lg max-sm:text-md"}>
                {features?.map((i, index) => <li key={index}>{i}</li>)}
            </ul>
        </div>
        
        <div className={`max-w-full flex-1 rounded-2xl flex items-center justify-center relative m-4 hover:scale-105 ${!left ? "md:origin-right" : "md:origin-left"} transition-all hover:overflow-visible`}>
        <div
            className="absolute z-10 opacity-75 -inset-0.5 rounded-2xl bg-gradient-to-tl from-orange-400 to-red-500 blur"
        ></div>
        <motion.video onViewportEnter={(e) => {
            (e?.target as HTMLVideoElement | undefined)?.play();
        }} onViewportLeave={(e) => (e?.target as HTMLVideoElement | undefined)?.pause()} className={`w-fit rounded-2xl z-10`} muted loop playsInline>
                <source src={videoUrl} type="video/mp4" />
        </motion.video>
        </div>
    </div>)
}