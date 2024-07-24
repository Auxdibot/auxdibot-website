import Button from "@/components/ui/button/primary-button";
import { BsHouse } from "react-icons/bs";

export default function LeaderboardNotFound() {
    return (<main className={`flex flex-col max-md:p-1 justify-center items-center overflow-x-hidden`}>
    <div>
        <h1 className="text-2xl font-raleway">Could not find that leaderboard.</h1>
        <Button icon={<BsHouse/>} text={"Home"} href={"/"}/>
    </div>
    </main>);
}