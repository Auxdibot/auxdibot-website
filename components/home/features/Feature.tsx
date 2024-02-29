import { motion } from 'framer-motion';

export function Feature({ name, description }: { name: JSX.Element; description: JSX.Element; }) {
    return <motion.div viewport={{ once: true }} transition={{ duration: 1 }} whileInView={{ opacity: 1 }} initial={false} className={"relative group opacity-0"}>
        <div
            className="absolute lg:group-hover:scale-105 group-hover:opacity-30 -inset-1 rounded-lg bg-gradient-to-tl z-10 from-orange-400 to-red-500 opacity-0 blur-2xl"
        ></div>
        <div className={"flex flex-col gap-1 max-lg:w-fit bg-background-300 border p-2 py-5 rounded-2xl hover:border-gray-400 border-gray-800 transition-all hover:bg-gradient-to-br from-background-200 to-background-300 relative z-20"}>
            <h1 className={"font-montserrat text-2xl max-lg:text-xl flex items-center gap-2"}>{name}</h1>
            <p className={"font-open-sans max-lg:text-sm max-lg:w-fit"}>{description}</p>
        </div>
    </motion.div>;
}
