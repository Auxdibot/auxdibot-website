
import { Button } from "@/components/ui/button/button";
import { useContext } from "react";
import { ArrowBigLeft, ArrowBigRight, ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { StartContext } from "@/context/StartContext";
export function LeaderboardPagination({ total }: { total: number }) {
    const { start, setStart } = useContext(StartContext);
    return (<>
        <div className="flex justify-center my-4 gap-2 items-center">
            <Button variant={"outline"} onClick={() => setStart && setStart(0)}><ArrowLeftFromLine/></Button>
            <Button variant={"secondary"} disabled={start - 20 < 0} onClick={() => setStart && setStart(start-20 < 0 ? 0 : start-20)}><ArrowBigLeft/></Button>
            <span className="text-white mx-4 font-roboto max-sm:hidden">{start + 1} - {Math.min(start + 20, total)} of {total}</span>
            <Button variant={"secondary"} disabled={start + 20 >= total} onClick={() => setStart && setStart(start+20)}><ArrowBigRight/></Button>
            <Button variant={"outline"} onClick={() => setStart && setStart(total % 20 == 0 ? total-20 : total - total%20)}><ArrowRightFromLine/></Button>
        </div>
        <span className="text-white font-roboto sm:hidden mx-auto">{start + 1} - {Math.min(start + 20, total)} of {total}</span>
        </>
    );
}