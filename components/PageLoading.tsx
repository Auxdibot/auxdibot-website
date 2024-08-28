import { BsThreeDots } from 'react-icons/bs';

export default function PageLoading() {
    return (
        <main
            className={
                'flex flex-grow items-center justify-center bg-black bg-auxdibot-masthead'
            }
        >
            <BsThreeDots className={'animate-spin text-8xl text-white'} />
        </main>
    );
}
