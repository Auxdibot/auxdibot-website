import Image from "next/image";
import Analytics from "./Analytics";
import Link from "next/link";
import { BsGear } from 'react-icons/bs';
export default function Masthead() {
    
    return (
    <main className={"h-screen"}>
        <section className={"flex items-center bg-gray-700 h-full bg-no-repeat bg-blend-color-dodge bg-cover 0"}>
        <div className={"flex w-full flex-row justify-center"}>
            <section className={"flex-grow flex-shrink flex-1 flex items-center justify-center flex-col mx-auto"}>
                <div className={"w-fit"}>
                    <h1 className={"header text-8xl"}>Auxdibot</h1>
                    <Analytics/>
                    <Link className={"w-fit px-8 mx-auto rounded-full border-gray-300 border flex gap-2 justify-center secondary items-center my-2 py-2 text-2xl hover:bg-gradient-to-l transition-all hover:text-gray-800 hover:border-gray-800 hover:from-orange-500 hover:to-red-400"} href={'/dashboard'}><BsGear/> Dashboard</Link>
                </div>
                
            </section>
            <section className={"flex-grow flex-shrink flex-1 flex items-center justify-center flex-col text-left"}>
            <Image
                src={"/icon.png"}
                alt={"Auxdibot icon."}
                width={256}
                height={256}
                priority
            />
            </section>
        </div>
        </section>
        
    </main>
    );
}