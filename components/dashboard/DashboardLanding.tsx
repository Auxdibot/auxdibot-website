import Link from "next/link";
import { BsList } from "react-icons/bs";
export default function DashboardLanding({ serverID }: { readonly serverID: string }) {
    return (<main className={'flex-grow flex bg-gray-950 justify-center items-center'}>
        <div className={"animate-fadeIn max-w-2xl flex flex-col gap-4"}>
            <h1 className={"header text-6xl text-center max-md:text-5xl"}>dashboard</h1>
            <p className={"secondary text-gray-100 text-xl text-center w-fit"}>Welcome to Auxdibot&apos;s dashboard! Select a category on the left (or by pressing <BsList className={"inline"}/> on mobile) to begin editing the settings for your server.</p>
            <section className={'flex max-md:flex-col max-md:px-4 max-md:my-5 gap-5'}>
                <Link href={`/dashboard/${serverID}/embeds`} className={'flex-1 bg-gray-900 p-1 border-gray-800 border hover:scale-105 transition-all bg-auxdibot-gradient rounded-2xl flex flex-col text-center'}>
                    <h1 className={"font-montserrat secondary-gradient text-4xl my-2"}>Embeds</h1>
                    <p className={"font-open-sans"}>Create and preview custom Discord Embeds using the Embeds section on Auxdibot&apos;s Dashboard.</p>
                </Link>
                <Link href={`/dashboard/${serverID}/moderation`} className={'flex-1 bg-gray-900 p-1 border-gray-800 border hover:scale-105 transition-all bg-auxdibot-gradient rounded-2xl flex flex-col text-center'}>
                    <h1 className={"font-montserrat secondary-gradient text-4xl my-2"}>AutoMod</h1>
                    <p className={"font-open-sans"}>Configure your AutoMod settings on Auxdibot&apos;s organized dashboard!</p>
                </Link>
                <Link href={`/dashboard/${serverID}/settings`} className={'flex-1 bg-gray-900 p-1 border-gray-800 border hover:scale-105 transition-all bg-auxdibot-gradient rounded-2xl flex flex-col text-center'}>
                    <h1 className={"font-montserrat secondary-gradient text-4xl my-2"}>Settings</h1>
                    <p className={"font-open-sans"}>Disable/Enable Auxdibot&apos;s modules, reset Auxdibot&apos;s settings, and change Auxdibot&apos;s username in Auxdibot&apos;s Settings tab!</p>
                </Link>
            </section>
        </div>
        
        </main>);
}