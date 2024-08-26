'use client';

import { PunishmentType } from '@/lib/types/PunishmentType';
import WarnThreshold from './WarnsThreshold';
import MuteRole from './settings/MuteRole';
import PunishmentsSendModerator from './settings/PunishmentsSendModerator';
import PunishmentsSendReason from './settings/PunishmentsSendReason';
import ReportsSettings from './reports/ReportsSettings';
import { Separator } from '@/components/ui/separator';

export default function ModerationSettings({
    server,
}: {
    server: {
        readonly serverID: string;
        readonly mute_role: string;
        readonly punishment_send_reason: boolean;
        readonly punishment_send_moderator: boolean;
        readonly reports_channel: string;
        readonly report_role: string;
        readonly automod_threshold_punishment: PunishmentType;
        readonly automod_punish_threshold_warns: number;
    };
}) {
    return (
        <>
            <div
                className={
                    'h-fit w-full flex-1 rounded-2xl border-2 border-gray-800 shadow-2xl max-md:mx-auto'
                }
            >
                <h2
                    className={
                        'secondary rounded-2xl rounded-b-none p-4 text-center text-2xl'
                    }
                >
                    Moderation Settings
                </h2>
                {server && <MuteRole server={server} />}
                <Separator className='mx-auto my-4 max-w-md' />
                <h3
                    className={
                        'mt-4 text-center font-open-sans text-2xl text-gray-300'
                    }
                >
                    Punishment Settings
                </h3>
                <div
                    className={
                        'my-4 flex items-center justify-center gap-8 max-md:flex-col'
                    }
                >
                    <span
                        className={
                            'flex flex-1 flex-col items-center justify-center gap-2'
                        }
                    >
                        <label className={'font-open-sans text-xl'}>
                            Send Reason
                        </label>
                        {server && <PunishmentsSendReason server={server} />}
                    </span>
                    <span
                        className={
                            'flex flex-1 flex-col items-center justify-center gap-2'
                        }
                    >
                        <label className={'font-open-sans text-xl'}>
                            Send Moderator
                        </label>
                        {server && <PunishmentsSendModerator server={server} />}
                    </span>
                </div>
                <Separator className='mx-auto my-4 max-w-md' />
                <h3
                    className={
                        'mt-4 text-center font-open-sans text-2xl text-gray-300'
                    }
                >
                    Warn Threshold
                </h3>
                <WarnThreshold server={server} />
                <Separator className='mx-auto my-4 max-w-md' />
                <h3
                    className={
                        'mt-4 text-center font-open-sans text-2xl text-gray-300'
                    }
                >
                    Reports Settings
                </h3>
                <ReportsSettings server={server} />
            </div>
        </>
    );
}
