import AboutBot from "@/components/home/AboutBot";
import Analytics from "@/components/home/Analytics";
import { Features } from "@/components/home/features/Features";
import Footer from "@/components/home/Footer";
import Masthead from "@/components/home/Masthead";
import { Preview } from "@/components/home/Preview";
import Start from "@/components/home/Start";

export default function Home() {
  return (
    <main className="bg-zinc-950 flex flex-col gap-40">
      <Masthead/>
      <Analytics/>
      <AboutBot/>
      <Features/>
      <Preview/>
      <Start/>
      <Footer/>
    </main>
  )
}
