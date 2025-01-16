import Link from 'next/link';
import { Button } from '../ui/button/button';
import { BsGithub, BsLink } from 'react-icons/bs';

export default function Footer() {
    return (
        <footer
            className={
                'flex justify-between border-t-2 border-zinc-800 bg-gradient-to-bl from-zinc-300/10 via-zinc-700/5 to-zinc-900/5 p-16 font-inter text-base max-md:text-sm max-sm:flex-col max-sm:items-center max-sm:gap-5 max-sm:text-center'
            }
        >
            <div className='flex flex-col'>
                <h3 className='font-raleway text-lg font-bold'>Resources</h3>
                <Link href={process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? ''}>
                    <Button className='px-0' variant={'link'}>
                        Documentation
                    </Button>
                </Link>

                <Link href={process.env.NEXT_PUBLIC_DISCORD_SERVER_LINK ?? ''}>
                    <Button className='px-0' variant={'link'}>
                        Support Server
                    </Button>
                </Link>
            </div>
            <div className='flex flex-col'>
                <h3 className='font-raleway text-lg font-bold'>Legal</h3>
                <Link
                    href={
                        (process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? '') +
                        '/legal/terms-of-service'
                    }
                >
                    <Button className='px-0' variant={'link'}>
                        Terms of Service
                    </Button>
                </Link>

                <Link
                    href={
                        (process.env.NEXT_PUBLIC_DOCUMENTATION_LINK ?? '') +
                        '/legal/privacy-policy'
                    }
                >
                    <Button className='px-0' variant={'link'}>
                        Privacy Policy
                    </Button>
                </Link>
            </div>
            <div className='flex flex-col'>
                <h3 className='font-raleway text-lg font-bold'>General</h3>
                <Link href={'/'}>
                    <Button className='px-0' variant={'link'}>
                        Home
                    </Button>
                </Link>

                <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>
                    <Button className='px-0' variant={'link'}>
                        Contact Us
                    </Button>
                </Link>
            </div>
            <div className='flex flex-col gap-1'>
                <h3 className='header text-2xl'>auxdibot</h3>
                <span className='font-inter text-zinc-300'>
                    © 2025 Steven Primeaux
                </span>
                <span className='flex gap-2 max-sm:justify-center'>
                    <Link href={'https://github.com/Auxdible'}>
                        <BsGithub />
                    </Link>
                    <Link href={'https://auxdible.me'}>
                        <BsLink />
                    </Link>
                </span>
            </div>
        </footer>
    );
}
