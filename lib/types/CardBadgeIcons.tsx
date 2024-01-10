import { BsClock, BsGlobe, BsPeople, BsPerson, BsStar } from "react-icons/bs";
import { CardBadge } from "./CardBadge";

export const CardBadgeIcons: {[key in CardBadge]: React.ReactElement} = {
    "OLD_OWNER": <BsClock />,
    "FEATURED": <BsStar className={"text-amber-600"} />,
    "PUBLIC": <BsGlobe className={"text-blue-500"} />,
    "HUNDRED_MEMBERS": <BsPerson className={"text-green-200"} />,
    "THOUSAND_MEMBERS": <BsPeople className={"text-green-500"} />,
}