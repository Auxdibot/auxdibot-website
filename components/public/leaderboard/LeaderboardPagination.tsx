
import { Button } from "@/components/ui/button/button";
import { useContext } from "react";
import { ArrowBigLeft, ArrowBigRight, ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { StartContext } from "@/context/StartContext";
export function LeaderboardPagination({ total }: { total: number }) {
    const { start, setStart } = useContext(StartContext);
    return (
        <>
            <div className='my-4 flex items-center justify-center gap-2'>
                <Button
                    variant={'outline'}
                    onClick={() => setStart && setStart(0)}
                >
                    <ArrowLeftFromLine />
                </Button>
                <Button
                    variant={'secondary'}
                    disabled={start - 20 < 0}
                    onClick={() =>
                        setStart && setStart(start - 20 < 0 ? 0 : start - 20)
                    }
                >
                    <ArrowBigLeft />
                </Button>
                <span className='mx-4 font-roboto text-white max-sm:hidden'>
                    {start + 1} - {Math.min(start + 20, total)} of {total}
                </span>
                <Button
                    variant={'secondary'}
                    disabled={start + 20 >= total}
                    onClick={() => setStart && setStart(start + 20)}
                >
                    <ArrowBigRight />
                </Button>
                <Button
                    variant={'outline'}
                    onClick={() =>
                        setStart &&
                        setStart(
                            total % 20 == 0 ? total - 20 : total - (total % 20)
                        )
                    }
                >
                    <ArrowRightFromLine />
                </Button>
            </div>
            <span className='mx-auto font-roboto text-white sm:hidden'>
                {start + 1} - {Math.min(start + 20, total)} of {total}
            </span>
        </>
    );
}
