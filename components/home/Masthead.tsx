"use client";

import Analytics from "./Analytics";
import { BsEnvelopePlus, BsGear, BsThreeDots } from 'react-icons/bs';
import Button from "../ui/button/primary-button";
import useSession from "@/lib/hooks/useSession";
import { Icon } from "./Icon";
import { Suspense } from "react";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Names from "./Names";

export default function Masthead() {
    const { user, status } = useSession();
    
    return (
    <main className={"min-h-screen bg-auxdibot-masthead"}>
        
        <section className={"min-h-screen flex justify-center"}>
        <div className={"flex w-full flex-col max-md:flex-col justify-center items-center gap-2"}>
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
        </div>
        
     
            <h1 className={"header text-8xl max-md:text-6xl w-fit"}>auxdibot</h1>
            <span className={"secondary text-3xl max-md:text-2xl text-white text-center flex flex-col items-center"}>The next Discord Bot for your 
            <Names/>
            </span>
            <Analytics/>
            {status == 'loading' ? <BsThreeDots className={"animate-spin text-4xl text-white"}/> : user ? <Button icon={<BsGear/>} text={"Dashboard"} href={"/dashboard"}/> : <Button href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK} icon={<BsEnvelopePlus/>} target={'_blank'} text={"Invite Bot"}/> }
        </div>
        
        </section>
        
    </main>
    );
}