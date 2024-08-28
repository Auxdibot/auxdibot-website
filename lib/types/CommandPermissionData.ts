export interface CommandPermissionData {
    command: string;
    subcommand?: string;
    group?: string;
    admin_only: boolean;
    channel_output?: string;
    permission_bypass_roles: string[];
    channels: string[];
    blacklist_channels: string[];
    blacklist_roles: string[];
    roles: string[];
    disabled?: boolean;
}
