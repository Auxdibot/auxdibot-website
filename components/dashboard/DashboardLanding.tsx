import { BsList } from "react-icons/bs";
export default function DashboardLanding() {
    return (<main className={'flex-grow flex bg-gray-950 justify-center items-center'}>
        <div className={"animate-fadeIn max-w-xl flex flex-col gap-4"}>
            <h1 className={"header text-6xl text-center max-md:text-5xl"}>dashboard</h1>
            <p className={"secondary text-gray-100 text-xl text-center w-fit"}>Welcome to Auxdibot&apos;s dashboard! Select a category on the left (or by pressing <BsList className={"inline"}/> on mobile) to begin editing the settings for your server.<br/><br/>Need help? Reach out to us on our Discord support server or check the documentation!</p>
        </div>
        
        </main>);
}