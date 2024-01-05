import { BsDisc, BsGear, BsWindowDesktop } from "react-icons/bs";
import { motion } from 'framer-motion';
import { IconType } from "react-icons/lib";

function Point({ title, description, Icon }: { title: string, description: string, Icon: IconType }) {
    return (<section className={"flex flex-col gap-2 lg:group-hover:scale-105 transition-all justify-between border border-gray-800 bg-gray-950 px-1 py-5 items-center text-center w-fit rounded-xl shadow-2xl relative h-full"}>
            
            <div className="flex-1 flex flex-col gap-2 items-center">
            <motion.span 
            className={"p-2 rounded-lg text-4xl bg-gradient-to-b from-primary-100 to-primary-600 transition-all border border-black text-black w-fit h-fit"}
            initial={{ transform: "translateY(-2rem)", backgroundColor: "transparent", opacity: 0 }} 
            viewport={{ once: true }} 
            whileInView={{ transform: "translateY(0px)", backgroundColor: "rgb(107, 114, 128)", opacity: 1 }}  
            transition={{ duration: 0.5 }}>{<Icon/>}</motion.span>
            <h1 className={"font-montserrat text-gray-300 text-3xl"}>{title}</h1>
            </div>
            <p className={"flex-1 font-open-sans text-gray-300 text-md"}>{description}</p>
    </section>);
}
export default function Points() {
    return <div className={"w-full flex flex-row justify-between gap-5 lg:px-40 px-10 max-md:flex-col mt-10 max-w-screen-2xl mx-auto"}>
        <div className={"relative flex-1 group"}>
            <div
            className="absolute lg:group-hover:scale-105 group-hover:opacity-75 -inset-1 rounded-lg bg-gradient-to-tl from-orange-400 to-red-500 opacity-0 blur"
            ></div>
            <Point
                title={"Dashboard"}
                description={"Auxdibot features an easy-to-use dashboard site, allowing admins to customize Auxdibot's features from anywhere!"}
                Icon={BsWindowDesktop}
            />
        </div>
        <div className={"relative flex-1 group"}>
            <div
            className="absolute lg:group-hover:scale-105 group-hover:opacity-75 -inset-1 rounded-lg bg-gradient-to-tl from-orange-400 to-red-500 opacity-0 blur"
            ></div>
            <Point
                title={"Configurable"}
                description={"Auxdibot has many options that can be tweaked, allowing admins to take full advantage of Auxdibot's features!"}
                Icon={BsGear}
            />
        </div>
        <div className={"relative flex-1 group"}>
            <div
            className="absolute lg:group-hover:scale-105 group-hover:opacity-75 -inset-1 rounded-lg bg-gradient-to-tl from-orange-400 to-red-500 opacity-0 blur"
            ></div>
            <Point
                title={"Multipurpose"}
                description={"Auxdibot contains an expansive suite of features for admins to manage their servers with! Auxdibot is the one-stop shop for Discord management tools."}
                Icon={BsDisc}
            />
        </div>
        
    </div>;
}