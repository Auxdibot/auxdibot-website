import DashboardActionContext from "@/context/DashboardActionContext"
import { useContext, useEffect, useState } from "react"
import { BsCheckCircle, BsExclamationCircle, BsXCircle } from "react-icons/bs";

export default function Action() {
    const actionContext = useContext(DashboardActionContext);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (actionContext?.action && !show) {
            setShow(true);
            setTimeout(() => {
                actionContext.setAction(null);
                setShow(false);
            }, 10000);
        }
    }, [actionContext, show]);
    if (!actionContext?.action) return <></>;
    return (<div className={`fixed flex flex-row justify-between gap-4 max-md:w-screen md:right-2 md:bottom-2 max-md:bottom-0 max-md:right-0 max-md:animate-fadeUp md:animate-fadeRight border p-2 md:max-w-md rounded-lg ${actionContext.action.success ? "bg-green-500 border-green-600" : "bg-red-500 border-red-600"}`}>
        <div>
        <span className={"flex flex-row gap-2 items-center text-2xl secondary text-white"}>{actionContext.action.success ? <><BsCheckCircle/> Success</> : <><BsExclamationCircle/> Error</>}</span>
        <span className={"text-lg font-roboto"}>{actionContext.action ? actionContext.action.status : ""}</span>
        </div>
        <button className={"text-xl w-fit"} onClick={() => actionContext?.setAction(null)}><BsXCircle/></button>
        </div>)
}