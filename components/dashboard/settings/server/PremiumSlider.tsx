import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/dialog/alert-dialog';
import Link from 'next/link';
import { BsCurrencyDollar } from 'react-icons/bs';

export function PremiumSlider() {
    function activatePremium() {
        /* TODO: Premium Functionality endpoint here */
    }
    return (
        <div
            className={
                'relative h-8 w-16 rounded-full border border-gray-700 px-1'
            }
        >
            <div
                onClick={activatePremium}
                className={`absolute bottom-1/2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-l transition-all ${false ? 'translate-x-full from-yellow-200 to-yellow-500 text-black' : '-translate-x-0.5 from-neutral-400 to-neutral-600 text-white'}`}
            >
                <AlertDialog>
                    <AlertDialogTrigger>
                        <span className={'text-md opacity-60'}>
                            <BsCurrencyDollar />
                        </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle
                            className={
                                'premium-gradient flex items-center gap-1 bg-clip-text font-bauhaus text-4xl text-transparent'
                            }
                        >
                            auxdibot premium
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Thank you for your interest in Auxdibot Premium!
                            Currently, Auxdibot Premium is not released and the
                            features for it are not complete. Stay tuned for
                            more updates and visit our{' '}
                            <Link
                                className={
                                    'premium-gradient bg-clip-text text-transparent'
                                }
                                href={'/premium'}
                            >
                                Premium Page
                            </Link>{' '}
                            to learn more!
                        </AlertDialogDescription>
                        <AlertDialogAction
                            className={'ml-auto w-fit'}
                            variant={'outline'}
                        >
                            Okay
                        </AlertDialogAction>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
