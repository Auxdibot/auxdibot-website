import Image from "next/image";
import Names from "./Names";
import { HeaderButton } from "../ui/header-button";
import { Sparkle } from "lucide-react";
import { DashboardButton } from "./DashboardButton";

export default function Masthead() {

    
    return (
    <section className={"min-h-screen bg-auxdibot-masthead bg-zinc-950 pt-8 max-md:pt-16 w-full"}>
        
        <section className={"min-h-screen flex justify-center"}>
        <div className={"flex w-full flex-col max-md:flex-col justify-center items-center gap-4"}>
        
        
            <div className="relative w-full h-[560px] max-md:h-[480px]">
            
                <div className="absolute top-12 max-md:top-0 left-2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[calc(100%-5rem)] z-20"><Image src="/masthead1.png" alt="test" width={0}
            height={0}
            sizes="100vw"
            className="object-cover object-left-top h-[360px] rounded-t-2xl w-[640px] max-md:h-48 max-md:w-full shadow-2xl shadow-zinc-900"
            quality={100}
            priority
            />
            <div className="h-[360px] absolute top-0 w-full bg-gradient-to-b from-transparent max-md:h-48 to-zinc-950 from-70% z-40"/>
            </div>
                <div className="absolute top-0 left-1/2 max-md:w-[calc(100%-1rem)] max-md:top-16 -translate-x-1/2  z-30">
                <Image src="/masthead2.png" alt="test" width={0}
            height={0}
            className="object-cover object-left-top h-[480px] rounded-t-2xl max-md:w-full max-md:h-72 w-[1024px]  shadow-2xl shadow-zinc-900"
            sizes="100vw"

            quality={100}
            priority />
            <div className="h-[480px] absolute top-0 w-full bg-gradient-to-b from-transparent max-md:h-72 to-zinc-950 from-70% z-40"/>
            </div>
            <div className="absolute top-12 right-2 max-md:right-1/2 max-md:translate-x-1/2 max-md:w-[calc(100%-5rem)] max-md:top-64 overflow-x-hidden z-20">
                <Image src="/masthead1.png" alt="test" width={0}
            height={0}
            sizes="100vw"
            className="object-cover object-right-top h-[360px] rounded-t-2xl max-md:w-full max-md:h-48 w-[640px] shadow-2xl shadow-zinc-900"
            quality={100}
            priority />
            <div className="h-[360px] absolute top-0 w-full mx-10 bg-gradient-to-b from-transparent max-md:h-48 to-zinc-950 from-70% z-40"/>
            </div>
            </div>

            <span className={"font-raleway text-5xl gap-3 max-lg:text-center text-zinc-100 mx-auto flex items-center w-full justify-center max-lg:flex-col max-lg:gap-10 max-lg:mb-10"}><span className="font-bold tracking-wide">The next Discord app for your</span> 
            <span className="relative overflow-visible w-32 lg:text-left"><Names/></span>
            </span>
            <span className="flex items-center max-lg:justify-center max-md:flex-col max-md:gap-5 max-w-xl w-full">
              <div className="flex-1 flex justify-center"><HeaderButton className="font-bold flex text-2xl" href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK}><span className="flex items-center gap-2"><Sparkle/> Get Auxdibot</span></HeaderButton></div>
              <div className="flex-1 flex justify-center"><DashboardButton/></div>
            
            </span>
        </div>
        
        </section>
        
    </section>
    );
}
/*
<div style={{ width: "250px", height: "200px", touchAction: "none" }}>
<Suspense fallback={ <BsThreeDots className={"animate-spin text-4xl text-white"}/>}>
          
        
        <Canvas>
        <ambientLight  intensity={0.0} />
        <PerspectiveCamera makeDefault position={[0,-1,10]}/>
        <Suspense fallback={null}>
        <PresentationControls
        global={false}
        cursor={true}
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 5, Math.PI / 5]}>
        <Icon frustumCulled={false} scale={[12,12,12]} rotation={[Math.PI/2,0,0]} frontToBack/>
      </PresentationControls>
            
        </Suspense>
      </Canvas>
      </Suspense> 
      </div>*/