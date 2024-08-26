import {
    BsDashCircle,
    BsExclamationTriangle,
    BsHammer,
    BsMicMute,
    BsTrash,
} from 'react-icons/bs';
import { PunishmentType } from '../types/PunishmentType';

let iconClass = 'text-red-600';
export const PunishmentNames: {
    [k in PunishmentType]: { name: string; icon: React.ReactElement };
} = {
    DELETE_MESSAGE: {
        name: 'Delete Message',
        icon: <BsTrash className={iconClass} />,
    },
    WARN: {
        name: 'Warn',
        icon: <BsExclamationTriangle className={iconClass} />,
    },
    KICK: {
        name: 'Kick',
        icon: <BsDashCircle className={iconClass} />,
    },
    MUTE: {
        name: 'Mute',
        icon: <BsMicMute className={iconClass} />,
    },
    BAN: {
        name: 'Ban',
        icon: <BsHammer className={iconClass} />,
    },
};
