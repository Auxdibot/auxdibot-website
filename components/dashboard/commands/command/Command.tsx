import { Button } from '@/components/ui/button/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { CommandPermissionData } from '@/lib/types/CommandPermissionData';
import { CommandType } from '@/lib/types/CommandType';
import { BsShieldCheck } from 'react-icons/bs';
import DisabledSlider from './DisabledSlider';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog/dialog';
import AdminOnlySlider from './AdminOnlySlider';
import OutputChannel from './OutputChannel';
import BlacklistedChannels from './BlacklistedChannels';
import RequiredChannels from './RequiredChannels';
import BlacklistedRoles from './BlacklistedRoles';
import RequiredRoles from './RequiredRoles';
import PermissionBypassRoles from './PermissionBypassRoles';
import { Separator } from '@/components/ui/separator';
interface CommandProps {
    readonly command: CommandType;
    readonly data?: CommandPermissionData;
    readonly id: string;
}
export function Command(props: CommandProps) {
    const { data, command, id } = props;
    return (
        <Card>
            <CardContent className={'flex flex-col gap-2 pt-4'}>
                <CardTitle
                    className={
                        'flex items-center justify-between font-montserrat text-lg font-normal'
                    }
                >
                    / {command.command} {command.group ?? ''}{' '}
                    {command.subcommand ?? ''}{' '}
                    <DisabledSlider
                        disabled={data?.disabled}
                        command={command.command}
                        subcommand={[
                            command.group ?? '',
                            command.subcommand ?? '',
                        ].filter((i) => i)}
                        id={id}
                    />
                </CardTitle>
                <CardDescription>
                    <CommandEditMenu {...props} />
                </CardDescription>
            </CardContent>
        </Card>
    );
}
function CommandEditMenu({ data, command, id }: CommandProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className={'gap-2'} variant={'outline'}>
                    <BsShieldCheck /> Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className={'max-h-[98dvh] max-w-2xl overflow-y-scroll'}
            >
                <DialogTitle className={'font-montserrat text-2xl font-normal'}>
                    Editing: / {command.command} {command.group ?? ''}{' '}
                    {command.subcommand ?? ''}{' '}
                </DialogTitle>
                <div className={'flex justify-between gap-2 max-sm:flex-col'}>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>Enabled</label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            Disabling the command will turn off the command for
                            all users except Discord Administrators on the
                            server.
                        </p>
                        <DisabledSlider
                            disabled={data?.disabled}
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>Admin Only</label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            Toggle whether users with the Administrator
                            permission on Discord can use this command
                            exclusively.
                        </p>
                        <AdminOnlySlider
                            admin_only={
                                data?.admin_only ?? !!!command.allowedDefault
                            }
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                </div>
                <Separator />
                <section
                    className={'flex flex-1 flex-col gap-1 max-sm:items-center'}
                >
                    <label className={'font-open-sans'}>Output Channel</label>
                    <p
                        className={
                            'w-fit text-center text-xs italic text-gray-400'
                        }
                    >
                        All command output will be publicly sent to this
                        channel. If unset, Auxdibot will reply to the
                        user&apos;s message.
                    </p>
                    <OutputChannel
                        output_channel={data?.channel_output}
                        command={command.command}
                        subcommand={[
                            command.group ?? '',
                            command.subcommand ?? '',
                        ].filter((i) => i)}
                        id={id}
                    />
                </section>
                <Separator />
                <div className={'flex justify-between gap-2 max-sm:flex-col'}>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>
                            Blacklisted Channels
                        </label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            Users will not be able to run this Auxdibot command
                            in a blacklisted channel.
                        </p>
                        <BlacklistedChannels
                            blacklisted={data?.blacklist_channels ?? []}
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>
                            Blacklisted Roles
                        </label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            Users with a blacklisted role will not be allowed to
                            run this Auxdibot command.
                        </p>
                        <BlacklistedRoles
                            blacklisted={data?.blacklist_roles ?? []}
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                </div>
                <Separator />
                <div className={'flex justify-between gap-2 max-sm:flex-col'}>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>
                            Required Channels
                        </label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            A channel that the user must run this Auxdibot
                            command in.
                        </p>
                        <RequiredChannels
                            required={data?.channels ?? []}
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                    <section
                        className={'flex flex-1 flex-col items-center gap-1'}
                    >
                        <label className={'font-open-sans'}>
                            Required Roles
                        </label>
                        <p
                            className={
                                'w-fit text-center text-xs italic text-gray-400'
                            }
                        >
                            A role that the user must have in order to run this
                            Auxdibot command.
                        </p>
                        <RequiredRoles
                            required={data?.roles ?? []}
                            command={command.command}
                            subcommand={[
                                command.group ?? '',
                                command.subcommand ?? '',
                            ].filter((i) => i)}
                            id={id}
                        />
                    </section>
                </div>
                <Separator />
                <section className={'flex flex-1 flex-col items-center gap-1'}>
                    <label className={'font-open-sans'}>
                        Permission Bypass Roles
                    </label>
                    <p
                        className={
                            'w-fit text-center text-xs italic text-gray-400'
                        }
                    >
                        A role that will bypass any Discord permissions when
                        running an Auxdibot command.
                    </p>
                    <PermissionBypassRoles
                        bypass={data?.permission_bypass_roles ?? []}
                        command={command.command}
                        subcommand={[
                            command.group ?? '',
                            command.subcommand ?? '',
                        ].filter((i) => i)}
                        id={id}
                    />
                </section>
            </DialogContent>
        </Dialog>
    );
}
