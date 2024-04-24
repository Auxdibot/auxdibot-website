---
title: Commands
---

## Command Syntax

---

You can view command usage in `/help all` or by viewing a command using `/help command`.

| Syntax  | Syntax Description |
| ------------- | ------------------- |
| `(argument)`| Argument is required. |
| `[argument]` | Argument is not required. |
| `(argument|argument2)`| One of two arguments are required. |
| `[...embed parameters]` | [Embed Parameters](/docs/embeds#embedparameters) are included in this command |

Commands contain subcommand groups or subcommands. (ex. `/command group subcommand` or `/command subcommand`)


## /help

---

|T|You can disable the help command for members on your server by creating a rule for it. See [Command Rules](#commandrules).|T|

Members can view Auxdibot's interactive help menu by running `/help all`. The interactive help menu features buttons, allowing members to view a brief description of every Auxdibot module, as well as the commands paired with it.

Members can additionally view a brief list of every module and whether it is disabled by running the command `/help modules`.

Members can view information about a specific command/subcommand by running the command `/help command (command) [subcommand]`.

Members can view a list of every Auxdibot placeholder by running the command `/help placeholders`.

| Command | Description |
| --- | --- |
| `/help all` | View Auxdibot's help menu, containing all the information you need to know. |
| `/help modules` | View Auxdibot's modules. |
| `/help placeholders` | View Auxdibot's placeholders. |
| `/help module (module)` | View a module's information, including commands and usage. |
| `/help command (command) [subcommand]` | View a command or subcommand's usage and description. |

## Modules

---

### Enabling and Disabling Modules

If you do not like one of Auxdibot's modules or are experiencing compatability issues with another bot, you can disable the module by using the `/modules disable` or `/modules enable` command. When a module is disabled, its commands cannot be run and any functionality relating to that module is disabled.

### Modules Commands

| Command | Description |
| --- | --- |
| `/modules disable (module)` | Disable Auxdibot's modules. |
| `/modules enable (module)` | Enable Auxdibot's modules. |

## Command Output

---

### Auxdibot Command Channel

Administrators or members with permission can set a channel for Auxdibot to exclusively use for running commands by running the command `/commands usage channel (command)`

### Command Channel Output

Administrators or members with permission can set the channel where output from a command being run is received by running the command `/commands output set (command) [channel]`. To remove an output channel, run the same command but remove the `channel` parameter.

### Command Output Commands

| Command | Description |
| --- | --- |
| `/commands output set (command) [channel]` | Set the channel that a command's output is broadcast to. |
| `/commands usage channel [channel]` | Set the channel where Auxdibot commands can be executed. |

## Command Rules

---

|!|Regardless of role/channel/enable or disable state, permission to run any command/press any button/fill any form is given to users with Discord Administrator. Be careful who you give the Administrator permission to on your server!|!|

### Enabling/Disabling Commands

|T|Commands that are a part of a non-disableable module cannot be disabled.|T|

Administrators or members with permission can disable individual commands by running the commands `/commands usage (enable|disable) (command)`. When a command is disabled, it cannot be run by any member that is not a Discord Administrator.

### Admin Only

Owners can set whether a command can be executed exclusively by server members that have the Discord Administrator permission by running the command `/commands admin set (command) (admin_only)`. When a command is set to Admin Only, it cannot be used by members that do not have the Discord Administrator Permission.

### Roles

Administrators or members with permission can require a user to have a role to run a command by running the command `/commands role require (command) (role)`. Required roles can be removed by running the command `/commands role unrequire (command) (role)`

Administrators or members with permission can blacklist users with a specific role from running a command by running the command `/commands role blacklist (command) (role)`. Blacklisted roles can be removed by running the command `/commands role unblacklist (command) (role)`

Bypass Roles allow members to bypass Discord Permission based requirements implemented into Auxdibot. Administrators or members with permission can add a permission bypass role by running the command `/commands bypass_roles add (command) (role)`. Permission bypass roles can be removed by running the command `/commands bypass_roles remove (command) (role)`.

### Channels

Administrators or members with permission can require server members to run a command in a specific channel by running the command `/commands channel require (command) (channel)`. Required channels can be removed by running the command `/commands channel unrequire (command) (channel)`

Administrators or members with permission can blacklist users from running a command in a specific channel by running the command `/commands role blacklist (command) (channel)`. Blacklisted channels can be removed by running the command `/commands channel unblacklist (command) (channel)`

### Command Rules Commands

| Command | Description |
| --- | --- |
| `/commands admin set (command) (admin_only)` | Set whether a command is allowed only for Discord Administrators. |
| `/commands bypass_roles add (command) (role)` | Add a role that can bypasses Discord permissions. |
| `/commands bypass_roles remove (command) (role)` | Remove a role that can bypasses Discord permissions. |
| `/commands rules view` | View the rules for a command. |
| `/commands rules delete` | Clear the rules set for a command. |
| `/commands usage enable (command)` | Enable the usage of a command. |
| `/commands usage disable (command)` | Disable the usage of a command. |
| `/commands channel blacklist (command) (channel)` | Blacklist a channel where a command cannot be run. |
| `/commands channel unblacklist (command) (channel)` | Unblacklist a channel where a command cannot be run. |
| `/commands channel require (command) (channel)` | Require a  command to be executed in a specific channel. |
| `/commands channel unrequire (command) (channel)` | Remove the requirement for a command to be executed in a specific channel. |
| `/commands role blacklist (command) (role)` | Blacklist a role from using a command. |
| `/commands role unblacklist (command) (role)` | Unblacklist a role from using a command. |
| `/commands role require (command) (role)` | Require a role to use a command. |
| `/commands role unrequire (command) (role)` | Unrequire a role required to use a command. |