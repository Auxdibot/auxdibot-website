---
title: Get Started

---

## Getting Started

-------------
|T|You can add Auxdibot to your server using [this link](https://discord.com/oauth2/authorize?client_id=1099157101978329138&scope=bot&permissions=8).|T|

Thank you for choosing Auxdibot!

You can auto*magically* configure Auxdibot for your server by running the command `/setup auto`, which will create a default set of channels (Including Starboard, Logging, and Suggestions), roles, automod settings.

Auxdibot's features are organized into individual "Modules" containing functionality and commands. You can run the command `/help all` to view a Module's brief description, and its commands.

### Dashboard

|T|You can view more information about the dashboard under the Documentation section, "Dashboard"|T|

Auxdibot features a dashboard with an intuitive and easy-to-approach UI. You can sign into Auxdibot's website by opening the `Sign in` menu in the navigation menu, and clicking `Sign in`.

You will be redirected to Discord to authenticate your Discord account. Once you have been authenticated through Discord, you can open up the Account menu by clicking your username in the navigation menu. In the Account menu, you can click `Servers` to view a list of the servers you can edit using Auxdibot.

Once you have added Auxdibot to your server, you can click the `Dashboard` button next to your server's icon to open Auxdibot's Dashboard. From there, you can select a category and edit Auxdibot's settings.

### Command Syntax

You can view command usage in `/help all` or by viewing a command using `/help command`.

| Syntax  | Syntax Description |
| ------------- | ------------------- |
| `(argument)`| Argument is required. |
| `[argument]` | Argument is not required. |
| `(argument|argument2)`| One of two arguments are required. |

Commands contain subcommand groups or subcommands. (ex. `/command group subcommand` or `/command subcommand`)

### Placeholders

Placeholders can be used in Embeds and more. You can view a list of all placeholders by running the command `/help placeholders`. Placeholders are *cAsE iNsEnSiTivE* (%placeholder% and {%PLACEHOLDER%} will both work the same)

## Basic Setup

-------------


### Enabling/Disabling Modules

If you do not like one of Auxdibot's modules or are experiencing compatability issues with another bot, you can disable the module by using the `/modules disable` or `/modules enable` command. When a module is disabled, its commands cannot be run and any functionality relating to that module is disabled.

### Commands

You can create command rules using the `/commands` command. Command Rules specify requirements for an Auxdibot command, such as requiring a command to be run in a specific channel, or requiring a certain role to run a command. Users with the `Administrator` Discord permission on your server will bypass any command rules.
* `/commands admin set (command) (admin_only)` - Specify whether a command can only be used by Discord Administrators.
* `/commands usage channel [channel]` - Restrict all Auxdibot commands to a specific channel.
* `/commands usage (disable|enable) (command)` - Enable or disable an Auxdibot command.

### Logging

Auxdibot allows you to log actions that are performed on your server! Additionally, any errors that may occur with schedules, notifications, and more will be logged to your log channel.
* `/logs channel [channel]` - Set the log channel for this server. 
* `/logs actions` - List every Auxdibot log action.
* `/logs filter (action)` - Toggle an Auxdibot log action. When a log action is disabled, it will not be logged to your log channel.
* `/logs latest` - View the latest logs on your server.

### Embeds

|!|Features that utilize Embeds are better experienced on the Auxdibot Dashboard!
If your Embed produces an error, which is most likely caused by malformed syntax, you will recieve a generic error message.
|!|

Embeds are utilized in Reaction Roles, Schedules, Notifications, and creating Embed messages.

If you are creating an Embed using Discord slash commands, you can utilize the following parameters:

| Parameter | Description |
|-----------|-------------|
| `color` | A color represented by a HEX code. |
| `title`   |  The title of the embed. |
| `description` | The description of the embed. |
| `footer_text` | The text for the footer of the embed. |
| `author_text` | The text for the author of the embed. |
| `author_icon_url` | A URL pointing to the image for the author of the embed. |
| `footer_icon_url` | A URL pointing to the image for the embed's footer. |
| `image_url` | A URL pointing to the image for the embed. |
| `thumbnail_url` | A URL pointing to the image for the thumbnail of the embed. (small image at the top right) |
| `title_url` | A URL that will be used for the title, that will redirect users when clicked. |
| `author_url` | A URL that will be used for the author, that will redirect users when clicked. |
| `fields` | The Embed Fields for the Embed. See "Embed Fields" below for more info. |

**Embed Fields**

For commands that use Auxdibot's embed creation parameters, there is a `fields` parameter. For every field, use `|d|` to seperate field titles from their descriptions, and `|s|` to seperate fields. Embeds created with slash commands do not support inline fields.

Fields Example

`Field 1|d|Field description for Field 1...|s|Field 2|d|Field description for Field 2...`

*is the equivilant to*

**Field 1**

Field Description for Field 1…

**Field 2**

Field description for Field 2…

### Mute Role

By default, Auxdibot utilizes Discord's Timeout system. If administrators wish to issue permanent mutes, a mute role will need to be specified using the `/moderation settings mute_role [role]` command. You can revert to using Discord's timeout system by running the command without specifying a `role`.
### Reaction Roles

Auxdibot's reaction roles come in various shapes and sizes. You can create a reaction role (with an automatically created embed) by using `/reaction_roles add (channel) (roles) [title] [type]`.

When creating a reaction role, for the `roles` parameter, you need to specify an emoji, followed by a space, followed by the role to receive when reacting with that emoji.

**Example**: `/reaction_roles add channel:#my-channel title:My Reaction Role roles:😀 @Role1 🤖 @Role2`

You can specify a reaction role `type` to decide how users interact with your reaction role.

| Type | Description |
|-----------|-------------|
| `Default` | The default method for reaction roles. The users reaction is removed and they will receive/lose the role. |
| `Select One`   |  The default method for reaction roles, except the user can only have one of the roles specified. |
| `Sticky` | The users reaction is not removed, and they will receive/lose the role. |
| `Sticky (Select One)` | The users reaction is not removed, except the user can only have one of the roles specified. |
| `Discord Button` | Utilize Discord Buttons instead of reactions on the Discord Embed. |
| `Discord Button (Select One)` | Utilize Discord Buttons instead of reactions on the Discord Embed, except the user can only have one of the roles specified. |
| `Select Menu` | Utilize Discord Select Menus instead of reactions on the Discord Embed, allowing users to select multiple roles at one time. |
| `Select Menu (Select One)` | Utilize Discord Select Menus instead of reactions on the Discord Embed, except the user can only have one of the roles specified. |

You can utilize `/reaction_roles add (channel) (roles) [type] [...embed parameters]` to create an embed. See [Embeds](#embeds) for more information on Embed Parameters.

### Suggestions

You can set a suggestions channel with `/suggestions channel (channel)`. Users can create suggestions with `/suggestions create (suggestion)` and their suggestion will be output to the suggestions channel. Administrators or people with permission can mark a suggestion accepted/denied/considered/added by running the command `/suggestions (accept|deny|consider|add) (id) [reason]`.

* You can enable/disable discussion threads by running the command `/suggestions discussion_threads (create_thread)`
* You can ban a user from suggestions by running the command `/suggestions ban (user)`

### Levels

Levels are by default enabled. You can set the XP earned from sending messages by running the command `/levels message_xp (xp)` command. 

You can set the channel level up messages are sent to using the `/levels channel [channel]` command. By default, Auxdibot will reply to the message that caused the user to level up.

You can disable Levels by running the command `/modules disable Levels`

### Join/Leave Messages

Greetings come with default embeds for when a user joins/leaves the server. You can set the channel where greeting/leaving messages are sent using `/greetings channel [channel]`. When a greetings channel is not set, no Join/Leave messages are sent.

Join DM greetings are sent directly to the user when they join the server, if their privacy settings allow it.

You can modify the Join/Leave/Join DM messages at any time by running the `/(join|leave|join_dm) message [...embed parameters]` commands. See [Embeds](#embeds) for more information on Embed Parameters. Additionally, you can preview the Join/Leave/Join DM messages by running the commands `/(join|leave|join_dm) preview`

### Join/Sticky Roles

Join Roles are given to a user when they join the server. You can add join roles by running the command `/join_roles add (role)`.

Sticky Roles are roles that are retained when a user leaves the server. When they join back, they will be granted the roles that they had back, if they were specified as a sticky role.