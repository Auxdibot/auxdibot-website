"use client";

import { Icon } from "@/components/home/Icon";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { PremiumBenefits } from "../../../components/premium/PremiumBenefits";
export default function PremiumPage() {
    return (
    <main className={'flex flex-col items-center justify-center bg-black w-full min-h-screen'}>
        
       
        <div className={"flex flex-col items-center text-center justify-center bg-auxdibot-premium-masthead w-full min-h-screen"}>
        <div className={"mt-auto w-full"}> 
        <div style={{ height: "200px", touchAction: "none" }}>
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
            <Icon
            frustumCulled={false} scale={[12,12,12]} rotation={[Math.PI/2,0,0]}
            randomColor1={"#eab308"}
            randomColor2={"#fef08a"}
            />
      </PresentationControls>
            
        </Suspense>
      </Canvas>
      </div>
        <h1 className={"text-6xl font-bauhaus premium-gradient bg-clip-text text-transparent"}>auxdibot premium</h1>
        <p className={"font-open-sans text-lg my-2 max-w-2xl mx-auto"}>Auxdibot premium is a paid subscription to Auxdibot, granting subscribers access to the latest beta features, increased limits, various features, swift communication with our developers, and a unique role on our server!</p>
        </div>
        
        <span className={"flex flex-col mt-auto justify-center text-2xl font-open-sans items-center gap-2"}>See more below<BsArrowDownShort className={"animate-bounce"}/></span>
        </div>
        <div className={"flex max-lg:flex-col items-center w-full max-w-4xl max-lg:max-w-xl max-md:px-1 justify-between gap-32 my-10"}>
            <div className={"relative w-full"}>
            <div
            className="absolute opacity-75 -inset-1 premium-gradient blur-2xl"
            ></div>
            <section className={"flex flex-col gap-10 w-full bg-background-300 bg-opacity-90 border border-black rounded-2xl p-2 relative py-5"}>
            <section className={"flex flex-col gap-2"}>
                <h1 className={'text-6xl py-1 font-bauhaus premium-gradient bg-clip-text text-transparent text-left w-full border-b-2 pb-5'}>monthly</h1>
                <span className={"text-2xl font-montserrat text-left"}><span className={"font-bold text-4xl"}>$TBD</span> USD/mo</span>
                </section>
                <ul className={'flex flex-col text-left gap-1'}>
                    <PremiumBenefits/>
                </ul>
            </section>
            
            </div>
            <div className={"relative w-full"}>
            <div
            className="absolute opacity-75 -inset-1 premium-gradient blur-2xl"
            ></div>
            <section className={"flex flex-col gap-10 w-full bg-background-300 bg-opacity-90 border border-black rounded-2xl p-2 relative py-5"}>
                <section className={"flex flex-col gap-2"}>
                <h1 className={'text-6xl py-1 font-bauhaus premium-gradient bg-clip-text text-transparent text-left w-full border-b-2 pb-5'}>yearly</h1>
                <span className={"text-2xl font-montserrat text-left"}><span className={"font-bold text-4xl"}>$TBD</span> USD/yr</span>
                </section>
                <ul className={'flex flex-col text-left gap-1'}>
                    <PremiumBenefits/>
                </ul>
            </section>
            </div>
        </div>
    </main>
    );
}