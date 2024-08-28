'use client';
import NotFound from '@/app/not-found';
import useSession from '@/lib/hooks/useSession';
import DiscordGuild from '@/lib/types/DiscordGuild';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
} from 'react';
import { BsArrowRight, BsList } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { ScrollArea } from '../ui/scroll-area';
import { SiYoutube } from '@icons-pack/react-simple-icons';
import {
    AlertTriangle,
    CircleSlashIcon,
    Clock,
    Hammer,
    Hand,
    ImageIcon,
    Medal,
    MessageCircleQuestion,
    Scroll,
    Settings,
    ShieldAlert,
    Star,
    Tag,
    Text,
} from 'lucide-react';

const ExpandedContext = createContext<{
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
} | null>(null);
export default function DashboardSidebarContainer({
    serverID,
}: {
    serverID: string;
}) {
    let [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { user, status } = useSession();
    if (status == 'loading') return <></>;
    if (status == 'unauthenticated') return <></>;
    let server = user.guilds.find((i: DiscordGuild) => i.id == serverID);
    return (
        <ExpandedContext.Provider value={{ expanded, setExpanded }}>
            {isMobile ? (
                <div className={'fixed z-50 w-64 max-md:w-48'}>
                    <div
                        className={`transition-transform ${expanded ? 'translate-x-0' : '-translate-x-48'}`}
                    >
                        <DashboardSidebar server={server} />
                    </div>
                    <button
                        className={`fixed rounded-br-full border-t-2 border-t-slate-950 bg-gray-950 pb-2 pr-2 text-4xl transition-all ${expanded ? 'ml-48' : ''}`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <BsList />
                    </button>
                </div>
            ) : (
                <DashboardSidebar server={server} />
            )}
        </ExpandedContext.Provider>
    );
}
enum SidebarCategories {
    HOME = 'home',
    CARD = 'card',
    SETTINGS = 'settings',
    LOGGING = 'logging',
    MODERATION = 'moderation',
    SCHEDULES = 'schedules',
    COMMANDS = 'commands',
    EMBEDS = 'embeds',
    STARBOARD = 'starboard',
    SUGGESTIONS = 'suggestions',
    LEVELS = 'levels',
    ROLES = 'roles',
    GREETINGS = 'greetings',
    NOTIFICATIONS = 'notifications',
}
export function DashboardSidebar({ server }: { server?: DiscordGuild }) {
    const router = useRouter();
    const contextExpanded = useContext(ExpandedContext);
    const pathname = usePathname();
    const page = useMemo(() => pathname.split('/').pop(), [pathname]);
    function changeCategory(category: SidebarCategories) {
        if (!server) return;

        if (category != 'home')
            router.push(`/dashboard/${server.id}/${category}`);
        else router.push(`/dashboard/${server.id}/`);
        setTimeout(() => contextExpanded?.setExpanded(false), 50);
    }
    if (!server) return <NotFound />;
    return (
        <>
            <div className={'w-64 flex-shrink-0'}>
                <nav
                    className={`fixed flex h-screen w-64 flex-col border-r-2 border-gray-800 bg-gray-950 max-md:w-48`}
                >
                    <ScrollArea>
                        <div
                            className={
                                'flex w-full flex-col border-b border-b-gray-800 pb-4'
                            }
                        >
                            <h2
                                className={
                                    'mb-2 mt-5 flex items-center gap-2 pl-1 font-montserrat text-lg'
                                }
                            >
                                <Settings size={'24'} /> General
                            </h2>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.SETTINGS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.SETTINGS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.SETTINGS
                                        )
                                    }
                                    className={`dashboard-sidebar-element items-center ${page == SidebarCategories.SETTINGS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Settings size={'20'} /> Settings
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.LOGGING ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.LOGGING ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.LOGGING
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.LOGGING ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Scroll size={'20'} /> Logging
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.COMMANDS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.COMMANDS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.COMMANDS
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.COMMANDS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <CircleSlashIcon size={'20'} /> Commands
                                </span>
                            </section>
                            <h2
                                className={
                                    'mb-2 mt-5 flex items-center gap-2 pl-1 font-montserrat text-lg'
                                }
                            >
                                <Hammer size={'24'} /> Utility
                            </h2>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.LEVELS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.LEVELS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(SidebarCategories.LEVELS)
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.LEVELS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Medal size={'20'} />{' '}
                                    <span
                                        className={
                                            'rounded-2xl bg-blue-500 px-1 text-sm'
                                        }
                                    >
                                        UPDATE
                                    </span>{' '}
                                    Levels
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.MODERATION ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.MODERATION ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.MODERATION
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.MODERATION ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <ShieldAlert size={'20'} /> Moderation
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.STARBOARD ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.STARBOARD ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.STARBOARD
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.STARBOARD ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Star size={'20'} /> Starboard
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.SUGGESTIONS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.SUGGESTIONS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.SUGGESTIONS
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.SUGGESTIONS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <MessageCircleQuestion size={'20'} />{' '}
                                    Suggestions
                                </span>
                            </section>

                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.ROLES ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.ROLES ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(SidebarCategories.ROLES)
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.ROLES ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Tag size={'20'} /> Roles
                                </span>
                            </section>
                            <h2
                                className={
                                    'mb-2 mt-5 flex items-center gap-2 pl-1 font-montserrat text-lg'
                                }
                            >
                                <Text size={'24'} /> Messages
                            </h2>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.EMBEDS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.EMBEDS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(SidebarCategories.EMBEDS)
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.EMBEDS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Text size={'20'} /> Embeds
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.NOTIFICATIONS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.NOTIFICATIONS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.NOTIFICATIONS
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.NOTIFICATIONS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <SiYoutube size={'20'} /> Notifications
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.SCHEDULES ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.SCHEDULES ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.SCHEDULES
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.SCHEDULES ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Clock size={'20'} /> Schedules
                                </span>
                            </section>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.GREETINGS ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.GREETINGS ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(
                                            SidebarCategories.GREETINGS
                                        )
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.GREETINGS ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <Hand size={'20'} /> Greetings
                                </span>
                            </section>
                            <h2
                                className={
                                    'mb-2 mt-5 flex items-center gap-2 pl-1 font-montserrat text-lg'
                                }
                            >
                                <AlertTriangle size={'24'} /> Beta Features
                            </h2>
                            <section
                                className={`dashboard-sidebar-wrapper ${page == SidebarCategories.CARD ? 'dashboard-sidebar-selected' : ''}`}
                            >
                                <span>
                                    <BsArrowRight
                                        className={`${page == SidebarCategories.CARD ? 'scale-75' : 'hidden scale-0'}`}
                                    />
                                </span>
                                <span
                                    onClick={() =>
                                        changeCategory(SidebarCategories.CARD)
                                    }
                                    className={`dashboard-sidebar-element ${page == SidebarCategories.CARD ? 'dashboard-sidebar-selected-text' : ''}`}
                                >
                                    <ImageIcon />{' '}
                                    <span
                                        className={
                                            'rounded-2xl bg-green-500 px-1 text-sm'
                                        }
                                    >
                                        BETA
                                    </span>{' '}
                                    Cards
                                </span>
                            </section>
                        </div>

                        {server ? (
                            <span
                                className={
                                    'mb-20 flex h-fit flex-shrink-0 flex-col items-center justify-center gap-3 py-4'
                                }
                            >
                                <span
                                    className={'cursor-pointer'}
                                    onClick={() =>
                                        changeCategory(SidebarCategories.HOME)
                                    }
                                >
                                    {server.icon ? (
                                        <Image
                                            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64`}
                                            alt={server.name + ' icon'}
                                            width={64}
                                            height={64}
                                            quality='100'
                                            className={`flex-grow rounded-[5rem] bg-discord-bg transition-all duration-300 hover:rounded-2xl`}
                                        />
                                    ) : (
                                        <span
                                            className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-[5rem] bg-discord-bg font-roboto text-sm text-gray-100 transition-all duration-300 hover:rounded-2xl hover:bg-discord-primary`}
                                        >
                                            {server.name
                                                .split(' ')
                                                .map((i) =>
                                                    'abcdefghijklmnopqrstuvwxyz'.indexOf(
                                                        i[0]
                                                    ) != -1
                                                        ? i[0]
                                                        : ''
                                                )
                                                .join('')}
                                        </span>
                                    )}
                                </span>
                                <span
                                    className={
                                        'secondary text-md text-center text-gray-100'
                                    }
                                >
                                    {server.name}
                                </span>
                            </span>
                        ) : (
                            'T'
                        )}
                    </ScrollArea>
                </nav>
            </div>
        </>
    );
}
