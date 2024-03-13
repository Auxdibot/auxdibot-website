import { BsBell, BsClock, BsImage, BsJournalCheck, BsPersonBadge, BsQuestion, BsRobot, BsShield, BsStar, BsTag, BsTextLeft, BsTrophy } from "react-icons/bs";
import { PiHandWaving } from "react-icons/pi";
import { Feature } from "./Feature";
import { FeatureColumn } from "./FeatureColumn";
export default function Features() {
    return (
    <div className={"grid grid-cols-3 max-lg:grid-cols-1 gap-4 max-w-7xl mx-auto lg:w-full relative"}>

        
        <FeatureColumn>
            <Feature name={<><BsShield/> Moderation</>} description={<>
                Auxdibot&apos;s moderation suite features a tracked punishment history, a variety of moderation commands, a reporting tool, and more. Moderators have a tool for every situation with Auxdibot&apos;s moderation suite.
            </>}/>
            <Feature name={<><BsBell/> Notifications</>} description={<>
                Auxdibot&apos;s notifications allow you to subscribe to alerts from your favorite youtube channel, twitch streamer, or RSS feed! Get notified when your favorite content creator uploads a new video or goes live.
            </>}/>
            <Feature name={<><BsQuestion/> Suggestions</>} description={<>
                Receive feedback from your server members with Auxdibot&apos;s suggestion system. Members can submit suggestions and vote on them, and moderators can respond to them with a reason and status.
            </>}/>
            <Feature name={<><BsTextLeft/> Embeds</>} description={<>
                Create fleshed out custom Discord Embeds with Auxdibot&apos;s embeds feature. Featuring an easy-to-use editor, you can create embeds with a variety of fields and colors.
            </>}/>
        </FeatureColumn>
        <FeatureColumn reverse>
        <Feature name={<><BsStar/> Starboard</>} description={<>
                Showcase your community highlights with Auxdibot&apos;s starboard feature! When a message reaches a certain amount of reactions, it will be showcased in a starboard channel.
            </>}/>
            <Feature name={<><BsJournalCheck/> Logging</>} description={<>
                Log messages, moderation actions, and more with Auxdibot&apos;s logging feature. Trace the latest actions taken on your server, and keep a record of everything that happens.
            </>}/>
            <Feature name={<><BsTrophy/> Levels</>} description={<>
                Incentivize your members to chat on your server with Auxdibot&apos;s levels feature. Members can earn experience, level up, and gain role rewards by chatting on a server with Auxdibot&apos;s Levels module enabled.
            </>}/>
            <Feature name={<><BsRobot/> AutoMod</>} description={<>
                Auxdibot features a fleshed out automod system which automatically logs actions on the server and automatically deals out punishments for specific infractions. AutoMod features a vast config that can be customized to your server&apos;s needs.
            </>}/>
        </FeatureColumn>
        <FeatureColumn>
        <Feature name={<><BsTag/> Roles</>} description={<>
                Auxdibot comes with a variety of role management features to help you integrate roles into your server, including reaction roles, join roles, sticky roles, and more. 
        </>}/>
        <Feature name={<><BsClock/> Schedules</>} description={<>
                Schedule reminders for events, meetings, and more with Auxdibot&apos;s schedules feature. Schedules can utilize custom embeds, placeholders, timestamps, and more.
            </>}/>
            <Feature name={<><PiHandWaving/> Greetings</>} description={<>
                Greet members as they join your server with Auxdibot&apos;s greetings feature. Greetings can be customized using Auxdibot&apos;s Discord Embed creator.
            </>}/>
            <Feature name={<><BsPersonBadge/> Permissions</>} description={<>
                Configure Auxdibot&apos;s permissions to your server&apos;s needs. Auxdibot features a variety of permissions for each module, and a role-based/user-based permission system.
            </>}/>
            <Feature name={<><span className={"border border-green-500 rounded-2xl p-1 text-md"}>BETA</span> <BsImage/> Cards</>} description={<>
                Experience the future of server presentation with Auxdibot&apos;s cards feature. Cards are a way to present your server to the world in a unique way. Create a custom website for your server with a library of various fonts and backgrounds.
            </>}/>
            
        </FeatureColumn>

    </div>
    )
}

