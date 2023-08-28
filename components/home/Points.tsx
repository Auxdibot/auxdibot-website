import { BsDiscord, BsHammer, BsWindowDesktop } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useMediaQuery } from "react-responsive";

export default function Points() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return <div className={"w-full flex flex-row justify-between gap-4 lg:px-40 max-md:flex-col my-20"}>
        <section className={"flex flex-col lg:hover:scale-105 transition-all flex-1 justify-between border border-gray-500 py-5 items-center text-center w-fit bg-gray-600 rounded-xl shadow-2xl"}>
            <div className="flex-1 flex flex-col gap-2 items-center">
            <motion.span 
            className={"p-2 rounded-lg text-4xl hover-gradient transition-all border hover:border-black hover:text-black w-fit h-fit"}
            initial={{ transform: "translateY(-2rem)", backgroundColor: "transparent", opacity: 0 }} 
            viewport={{ once: true }} 
            whileInView={{ transform: "translateY(0px)", backgroundColor: "rgb(107, 114, 128)", opacity: 1 }}  
            transition={{ duration: 0.5 }}><BsWindowDesktop/></motion.span>
            <h1 className={"header text-4xl"}>Dashboard</h1>
            </div>
            <p className={"flex-1 font-roboto text-md"}>Auxdibot features an easy-to-use dashboard site, allowing admins to customize Auxdibot&apos;s features from anywhere!</p>
        </section>
        <section className={"flex flex-col lg:hover:scale-105 transition-all border border-gray-500 flex-1 justify-between py-5 items-center text-center w-fit bg-gray-600 rounded-xl shadow-2xl"}>
            <div className="flex-1 flex flex-col gap-2 items-center">
            <motion.span 
            className={"p-2 rounded-lg text-4xl hover-gradient transition-all border  hover:border-black hover:text-black w-fit h-fit"}
            initial={{ transform: "translateY(-2rem)", backgroundColor: "transparent", opacity: 0 }} 
            viewport={{ once: true }} 
            whileInView={{ transform: "translateY(0px)", backgroundColor: "rgb(107, 114, 128)", opacity: 1 }} 
            transition={{ duration: 0.5, ...(isMobile ? {} : { delay: 0.3 })  }}><BsDiscord/></motion.span>
            <h1 className={"header text-4xl"}>Latest Features</h1>
            </div>
            <p className={"flex-1 font-roboto text-md"}>Auxdibot uses the latest Discord features, including Slash Commands, Models, and Timeouts!</p>
        </section>
        <section className={"flex flex-col lg:hover:scale-105 transition-all border border-gray-500 flex-1 justify-between py-5 items-center text-center w-fit bg-gray-600 rounded-xl shadow-2xl"}>
            <div className="flex-1 flex flex-col gap-2 items-center">
            <motion.span 
            className={"p-2 rounded-lg text-4xl hover-gradient transition-all border hover:border-black hover:text-black h-fit w-fit"}
            initial={{ transform: "translateY(-2rem)", backgroundColor: "transparent", opacity: 0 }} 
            viewport={{ once: true }} 
            whileInView={{ transform: "translateY(0px)", backgroundColor: "rgb(107, 114, 128)", opacity: 1 }} 
            transition={{ duration: 0.5, ...(isMobile ? {} : { delay: 0.6 }) }}><BsHammer/></motion.span>
            <h1 className={"header text-4xl"}>Multipurpose</h1>
            </div>
           
            <p className={"flex-1 font-roboto text-md"}>Auxdibot contains an expansive suite of features for admins to manage their servers with! Auxdibot is the one-stop shop for Discord management tools.</p>
        </section>
    </div>;
}