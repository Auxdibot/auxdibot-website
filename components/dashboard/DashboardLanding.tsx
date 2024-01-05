import { BsList } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
export default function DashboardLanding() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (<main className={'flex-grow flex bg-gray-950 justify-center items-center'}>
        <div className={"animate-fadeIn max-w-2xl flex flex-col gap-4"}>
            <h1 className={"header text-6xl text-center max-md:text-5xl"}>dashboard</h1>
            <p className={"secondary text-gray-100 text-xl text-center w-fit"}>Welcome to Auxdibot&apos;s dashboard! Select a category {isMobile ? <>by pressing <BsList className={"inline"}/> on mobile</> : <>using the sidebar</>} to begin editing the settings for your server.</p>
        </div>
        
        </main>);
}