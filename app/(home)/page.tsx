import AboutBot from '@/components/home/AboutBot';
import Analytics from '@/components/home/Analytics';
import { Ending } from '@/components/home/Ending';
import { Features } from '@/components/home/features/Features';
import Footer from '@/components/home/Footer';
import Masthead from '@/components/home/Masthead';
import { NewFeature } from '@/components/home/NewFeature';
import { Preview } from '@/components/home/Preview';
import Start from '@/components/home/Start';

export default function Home() {
    return (
        <main className='flex flex-col gap-52 bg-zinc-950'>
            <Masthead />
            <div className='flex flex-col gap-20'>
                <Analytics />
                <AboutBot />
            </div>
            <NewFeature />
            <Features />
            <Preview />
            <Start />
            <Ending />
            <Footer />
        </main>
    );
}
