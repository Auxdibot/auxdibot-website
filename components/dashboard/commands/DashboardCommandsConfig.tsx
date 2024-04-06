import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "react-query";
import { Commands } from "./Commands";
import { useMediaQuery } from "react-responsive";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";

export function DashboardCommandsConfig({ id }: { id: string }) {
    const [commandModule, setCommandModule] = useState('general');
    const [commandSearch, setCommandSearch] = useState('subcommand'); 
    const isSmall = useMediaQuery({ query: "(max-width: 1340px)" });
    const { data: commands_list } = useQuery(["data_commands_list", commandModule, commandSearch], async () => await fetch(`/api/v1/commands_list?module=${commandModule}&search=${commandSearch}`).then(async (data) => await data.json().catch(() => undefined)).catch(() => undefined));
    return (<main className={"bg-gray-950 flex-grow"}>
    <div className={"animate-fadeIn flex max-lg:items-center flex-col py-5 md:px-5 gap-5"}>
    <h1 className={"header text-6xl max-lg:text-5xl"}>commands</h1>
    <span className={"flex flex-row w-full max-xl:flex-col gap-10 my-2"}>
        <Card className="w-full relative self-stretch">
            
            
            <span className="absolute max-xl:-top-4 left-2 xl:-top-7">
            {isSmall ? 
                <Select value={commandModule} defaultValue="general" onValueChange={(e) => setCommandModule(e)}>
                <SelectTrigger className={'bg-gray-950 w-fit'}>
                    <SelectValue placeholder={"Select a module"}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="settings">Settings</SelectItem>
                    <SelectItem value="moderation">Moderation</SelectItem>
                    <SelectItem value="starboard">Starboard</SelectItem>
                    <SelectItem value="suggestions">Suggestions</SelectItem>
                    <SelectItem value="levels">Levels</SelectItem>
                    <SelectItem value="roles">Roles</SelectItem>
                    <SelectItem value="messages">Messages</SelectItem>
                    <SelectItem value="greetings">Greetings</SelectItem>
                </SelectContent>
            </Select>
            : 
                <Tabs value={commandModule} defaultValue="general" className="w-full" onValueChange={(e) => setCommandModule(e)}>
                <TabsList className={'flex mx-auto w-fit my-2'}>
                    <TabsTrigger value='general'>General</TabsTrigger>
                    <TabsTrigger value='settings'>Settings</TabsTrigger>
                    <TabsTrigger value='moderation'>Moderation</TabsTrigger>
                    <TabsTrigger value='starboard'>Starboard</TabsTrigger>
                    <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
                    <TabsTrigger value='levels'>Levels</TabsTrigger>
                    <TabsTrigger value='roles'>Roles</TabsTrigger>
                    <TabsTrigger value='messages'>Messages</TabsTrigger>
                    <TabsTrigger value='greetings'>Greetings</TabsTrigger>  
                </TabsList>
                </Tabs>
            }
            </span>
            <span className="absolute max-xl:-top-4 right-2 xl:-top-7">
            {isSmall ? 
                <Select value={commandSearch} defaultValue="subcommand" onValueChange={(e) => setCommandSearch(e)}>
                <SelectTrigger className={'bg-gray-950 w-fit'}>
                    <SelectValue placeholder={"Select a type"}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="command">Commands</SelectItem>
                    <SelectItem value="group">Groups</SelectItem>
                    <SelectItem value="subcommand">Subcommands</SelectItem>
                </SelectContent>
            </Select>
            : 
                <Tabs value={commandSearch} defaultValue="subcommand" className="w-full" onValueChange={(e) => setCommandSearch(e)}>
                <TabsList className={'flex mx-auto w-fit my-2'}>
                    <TabsTrigger value="command">Commands</TabsTrigger>
                    <TabsTrigger value="group">Groups</TabsTrigger>
                    <TabsTrigger value="subcommand">Subcommands</TabsTrigger> 
                </TabsList>
                </Tabs>
            }
            </span>
            <Commands commands={commands_list?.commands} id={id} />
        </Card>
    </span>
    </div>
    
        
    </main>)
}