export interface CommandPermissionData {
    command: string;
    subcommand?: string;
    group?: string;

    channel_output?: string;
    permission_bypass_roles: string[];
    channels: string[];
    blacklist_channels: string[];
    blacklist_roles: string[];
    discord_permissions: string[];
    roles: string[];
    disabled?: boolean;
}
