import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";

export function PremiumSlider() {
    function activatePremium() {
        
        /* TODO: Premium Functionality endpoint here */
    }
    return (<div className={"w-16 h-8 border border-gray-700 rounded-full relative px-1"} >
        <div onClick={activatePremium} className={`cursor-pointer absolute rounded-full top-1/2 bottom-1/2 -translate-y-1/2 h-7 w-7 transition-all bg-gradient-to-l flex items-center justify-center ${false ? "translate-x-full from-yellow-200 to-yellow-500 text-black" : "text-white from-neutral-400 to-neutral-600 -translate-x-0.5"}`}>
            <AlertDialog>
                <AlertDialogTrigger>
                    <span className={"text-md opacity-60"}><BsCurrencyDollar/></span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle className={"font-bauhaus text-4xl flex items-center gap-1 premium-gradient bg-clip-text text-transparent"}>auxdibot premium</AlertDialogTitle>
                    <AlertDialogDescription>Thank you for your interest in Auxdibot Premium! Currently, Auxdibot Premium is not released and the features for it are not complete. Stay tuned for more updates and visit our <Link className={"premium-gradient bg-clip-text text-transparent"} href={"/premium"}>Premium Page</Link> to learn more!</AlertDialogDescription>
                    <AlertDialogAction className={"w-fit ml-auto"} variant={'outline'}>Okay</AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        </div>
     </div>);
}