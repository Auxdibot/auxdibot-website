export interface CommandType {
    group?: string;
    subcommand?: string;
    command: string;
    allowedDefault?: boolean;
    module: string;
}
