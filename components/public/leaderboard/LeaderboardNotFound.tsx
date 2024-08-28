import Button from '@/components/ui/button/primary-button';
import { BsHouse } from 'react-icons/bs';

export default function LeaderboardNotFound() {
    return (
        <main
            className={`flex flex-col items-center justify-center overflow-x-hidden max-md:p-1`}
        >
            <div>
                <h1 className='font-raleway text-2xl'>
                    Could not find that leaderboard.
                </h1>
                <Button icon={<BsHouse />} text={'Home'} href={'/'} />
            </div>
        </main>
    );
}
