import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Commands } from './Commands';
import { useMediaQuery } from 'react-responsive';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select/select';

export function DashboardCommandsConfig({ id }: { id: string }) {
    const [commandModule, setCommandModule] = useState('general');
    const [commandSearch, setCommandSearch] = useState('subcommand');
    const isSmall = useMediaQuery({ query: '(max-width: 1340px)' });
    const { data: commands_list } = useQuery(
        ['data_commands_list', commandModule, commandSearch],
        async () =>
            await fetch(
                `/bot/v1/commands_list?module=${commandModule}&search=${commandSearch}`
            )
                .then(async (data) => await data.json().catch(() => undefined))
                .catch(() => undefined)
    );
    return (
        <main className={'flex-grow bg-gray-950'}>
            <div
                className={
                    'flex animate-fadeIn flex-col gap-5 py-5 max-lg:items-center md:px-5'
                }
            >
                <h1 className={'header text-6xl max-lg:text-5xl'}>commands</h1>
                <span
                    className={
                        'my-2 flex w-full flex-row gap-10 max-xl:flex-col'
                    }
                >
                    <Card className='relative w-full self-stretch'>
                        <span className='absolute left-2 max-xl:-top-4 xl:-top-7'>
                            {isSmall ? (
                                <Select
                                    value={commandModule}
                                    defaultValue='general'
                                    onValueChange={(e) => setCommandModule(e)}
                                >
                                    <SelectTrigger
                                        className={'w-fit bg-gray-950'}
                                    >
                                        <SelectValue
                                            placeholder={'Select a module'}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='general'>
                                            General
                                        </SelectItem>
                                        <SelectItem value='settings'>
                                            Settings
                                        </SelectItem>
                                        <SelectItem value='moderation'>
                                            Moderation
                                        </SelectItem>
                                        <SelectItem value='starboard'>
                                            Starboard
                                        </SelectItem>
                                        <SelectItem value='suggestions'>
                                            Suggestions
                                        </SelectItem>
                                        <SelectItem value='levels'>
                                            Levels
                                        </SelectItem>
                                        <SelectItem value='roles'>
                                            Roles
                                        </SelectItem>
                                        <SelectItem value='messages'>
                                            Messages
                                        </SelectItem>
                                        <SelectItem value='greetings'>
                                            Greetings
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Tabs
                                    value={commandModule}
                                    defaultValue='general'
                                    className='w-full'
                                    onValueChange={(e) => setCommandModule(e)}
                                >
                                    <TabsList
                                        className={'mx-auto my-2 flex w-fit'}
                                    >
                                        <TabsTrigger value='general'>
                                            General
                                        </TabsTrigger>
                                        <TabsTrigger value='settings'>
                                            Settings
                                        </TabsTrigger>
                                        <TabsTrigger value='moderation'>
                                            Moderation
                                        </TabsTrigger>
                                        <TabsTrigger value='starboard'>
                                            Starboard
                                        </TabsTrigger>
                                        <TabsTrigger value='suggestions'>
                                            Suggestions
                                        </TabsTrigger>
                                        <TabsTrigger value='levels'>
                                            Levels
                                        </TabsTrigger>
                                        <TabsTrigger value='roles'>
                                            Roles
                                        </TabsTrigger>
                                        <TabsTrigger value='messages'>
                                            Messages
                                        </TabsTrigger>
                                        <TabsTrigger value='greetings'>
                                            Greetings
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )}
                        </span>
                        <span className='absolute right-2 max-xl:-top-4 xl:-top-7'>
                            {isSmall ? (
                                <Select
                                    value={commandSearch}
                                    defaultValue='subcommand'
                                    onValueChange={(e) => setCommandSearch(e)}
                                >
                                    <SelectTrigger
                                        className={'w-fit bg-gray-950'}
                                    >
                                        <SelectValue
                                            placeholder={'Select a type'}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='command'>
                                            Commands
                                        </SelectItem>
                                        <SelectItem value='group'>
                                            Groups
                                        </SelectItem>
                                        <SelectItem value='subcommand'>
                                            Subcommands
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Tabs
                                    value={commandSearch}
                                    defaultValue='subcommand'
                                    className='w-full'
                                    onValueChange={(e) => setCommandSearch(e)}
                                >
                                    <TabsList
                                        className={'mx-auto my-2 flex w-fit'}
                                    >
                                        <TabsTrigger value='command'>
                                            Commands
                                        </TabsTrigger>
                                        <TabsTrigger value='group'>
                                            Groups
                                        </TabsTrigger>
                                        <TabsTrigger value='subcommand'>
                                            Subcommands
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )}
                        </span>
                        <Commands commands={commands_list?.commands} id={id} />
                    </Card>
                </span>
            </div>
        </main>
    );
}
