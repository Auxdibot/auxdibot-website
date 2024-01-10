import { BsClock, BsShieldCheck } from "react-icons/bs";
import { UserBadge } from "./UserBadge";

export const UserBadgeIcons: {[key in UserBadge]: React.ReactElement } = { 
    "OLD_USER": <BsClock/>,
    "PARTNER": <BsShieldCheck className={"text-primary-300"}/>
};