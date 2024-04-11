<div id="header" align="center">
  <img src="https://bot.auxdible.me/logo.png" width=225/>
  <h1 id="welcome">Commands</h1>
</div>

Auxdibot features many commands that will allow you to view and edit Auxdibot's settings for your server.

## Module State

If you don't like one of Auxdibot's modules or one of Auxdibot's modules is conflicting with another bot, it can be disabled and enabled using the `/modules` command. Disabling a feature will disable all Auxdibot commands attached to that module and disable any recurring actions for that module on your server.

## Dashboard

Modules can be enabled and disabled from Auxdibot's dashboard. Auxdibot's dashboard also features a "Reset Bot" option, and the ability to change the bot's nickname.

<p class="image">
<img alt="Dashboard Settings" src="/docs/_assets/dashboard_settings.png" width=450/>
<em>The dashboard settings for Auxdibot, allowing you to change the bot's nickname, reset the bot's settings, and disable/enable modules.</em>
</p>

## Commands

### Command Permissions

Auxdibot features command permissions. If a permission has a ✅ next to it, that permission is allowed by default. Permission overrides can be created to allow certain roles or users to have access to certain permissions. Permissions are also inherited. For example, if a user has the `moderation` permission, they also have the `moderation.punish` permission and the `moderation.punishments` permission.

### Embed Fields

For commands that use Auxdibot's embed creation parameters, there is a `fields` parameter. For every field, use `|d|` to seperate field titles from their descriptions, and `|s|` to seperate fields. Embeds created with slash commands do not support inline fields.

**Fields Example**

`Field 1|d|Field description for Field 1...|s|Field 2|d|Field description for Field 2...`

*is the equivilant to*

**Field 1**

Field Description for Field 1...

**Field 2**

Field description for Field 2...

### Command Timestamps

For commands that have a `duration`, `interval`, or `timestamp` option, you can to specify a timestamp. (`M` for months, `m` for minutes, `h` for hours, `d` for days, etc.) If the duration option is left empty, it will be substituted for a permanent duration.

**Timestamp Examples**

* 1M for 1 month
* 9h for 9 hours
* 2d for 2 days
* 3w for 3 weeks

### General Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/help modules` | View Auxdibot's modules. | `commands.help.modules` ✅ |
| `/help placeholders` | View Auxdibot's placeholders. | `commands.help.placeholders` ✅ |
| `/help module` | View a module's information, including commands and usage. | `commands.help.module` ✅ |
| `/help command` | View a command or subcommand's usage and description. | `commands.help.command` ✅ |

### Moderation Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/punish warn` | Warns a user, giving them a DM warning (if they have DMs enabled) and adding a warn to their record on the server. | `moderation.punish.warn` |
| `/punish mute` | Mutes a user, making them unable to talk in the server and adding a mute to their record on the server. Default duration is permanent. | `moderation.punish.mute` |
| `/punish kick` | Kicks a user, removing them from the server and adding a kick to their record on the server. | `moderation.punish.kick` |  
| `/punish ban` | Bans a user, removing them from the server and adding a ban to their record on the server. Default duration is permanent. | `moderation.punish.ban` |
| `/punish unban` | Unbans a user if they are currently banned. For banned members, use their user ID. | `moderation.punish.ban.remove` |     
| `/punish unmute` | Unmutes a user if they are currently muted. | `moderation.punish.mute.remove` |
| `/punishment view` | View a punishment. | `moderation.punishments.view` |
| `/punishment delete` | Delete a punishment. | `moderation.punishments.delete` |
| `/punishment latest` | View the last 10 punishments. | `moderation.punishments.latest` |
| `/punishment record` | View a user's punishment record. | `moderation.punishments.record` |

### Settings Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/user` | Displays an easy to use embed where you can view and edit a user's data, including punishments on their record. | `moderation.user` |
| `/modules disable` | Disable Auxdibot's modules. (/help modules) | `settings.modules.disable` |
| `/modules enable` | Enable Auxdibot's modules. (/help modules) | `settings.modules.enable` |
| `/settings view` | View all settings for the server. | `settings.view` |
| `/settings join_leave_channel` | Change the channel where join and leave messages are broadcast. | `settings.join_leave_channel` |
| `/settings mute_role` | Change the mute role for the server, which is automatically assigned to muted users. | `settings.mute_role` |
| `/logs channel` | Change the log channel for the server, where all actions are logged to. | `logs.log_channel` |
| `/logs actions` | Get a list of every action Auxdibot can log. | `logs.actions` |
| `/logs filter` | Toggle a log action from being logged on your server. | `logs.filter` |
| `/logs latest` | Get the latest logs on your server. | `logs.latest` |
| `/logs list_filtered` | List every filtered log action. | `logs.list_filtered` |

### Permissions Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ | 
| `/permissions view` | View a permission override. | `permissions.view` |
| `/permissions create` | Create a permission override. | `permissions.create` |
| `/permissions delete` | Delete a permission override. | `permissions.delete` |
| `/permissions list` | List all permission overrides. | `permissions.list` |

### Message Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/embed create` | Create an embed with Auxdibot. | `embed.create` |  
| `/embed create_json` | Create an embed with Auxdibot using valid Discord Embed JSON data. | `embed.create.json` |
| `/embed edit` | Edit an existing Embed by Auxdibot. | `embed.edit` | 
| `/embed edit_json` | Edit an existing Embed by Auxdibot using valid Discord Embed JSON data. | `embed.edit.json` |
| `/embed json` | Get the Discord Embed JSON data of any Embed on your server. | `embed.json` |
| `/schedule message` | Schedule a message using Auxdibot. | `schedule.message` |
| `/schedule edit` | Edit an existing Schedule by Auxdibot. | `schedule.edit` |
| `/schedule list` | List the schedules running on your server. | `schedule.list` |
| `/schedule remove` | Remove a schedule from your server. It will never run again after deletion. | `schedule.remove` |
| `/schedule preview` | Preview a scheduled message. | `schedule.preview` |

### Roles Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/join_roles add` | Add a role to be assigned when a member joins the server. | `roles.join_roles.add` |
| `/join_roles remove` | Remove a role that is assigned when a member joins the server. If you've deleted the role, use the index parameter, which is the placement of the item on /join_roles list. | `roles.join_roles.remove` |
| `/join_roles list` | List the roles that are assigned when a member joins the server. | `roles.join_roles.list` |
| `/massrole give` | Give everybody a role. | `massrole.give` |        
| `/massrole take` | Take away a role from every user. | `massrole.take` |
| `/reaction_roles add` | Add a reaction role to the server. | `rr.add` |
| `/reaction_roles add_custom` | Add a reaction role to the server with custom Embed parameters. | `rr.add.custom` |
| `/reaction_roles add_json` | Add a reaction role to the server with custom Discord Embed JSON. | `rr.add.json` |
| `/reaction_roles edit` | Edit a reaction role's embed on this server. | `rr.edit` |
| `/reaction_roles list` | List the reaction roles on this server. | `rr.list` |
| `/reaction_roles remove` | Remove a role that is assigned when a member joins the server. | `rr.remove` |
| `/sticky_roles add` | Add a role to be kept when a member rejoins the server. | `roles.sticky_roles.add` |
| `/sticky_roles remove` | Remove a role that is kept when a member rejoins the server. If you've deleted the role, use the index parameter, which is the placement of the item on /sticky_roles list. | `roles.sticky_roles.remove` |
| `/sticky_roles list` | List the roles that are kept when a member rejoins the server. | `roles.sticky_roles.list` |

### Suggestions Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/suggestions create` | Create a suggestion. | `suggestions.create` |
| `/suggestions channel` | Change the channel where suggestions are posted. (None to disable.) | `suggestions.channel` |
| `/suggestions updates_channel` | Change the channel where updates to suggestions are posted. | `suggestions.channel.updates` |
| `/suggestions reactions` | List the reactions for suggestions. | `suggestions.reactions` |
| `/suggestions add_reaction` | Add a reaction to the reactions on suggestions. | `suggestions.reactions.add` |
| `/suggestions remove_reaction` | Remove a reaction from the reactions on suggestions. | `suggestions.reactions.remove` |
| `/suggestions auto_delete` | Set whether suggestions are deleted upon being approved, denied, or marked as added. | `suggestions.auto_delete` |
| `/suggestions discussion_threads` | Set whether a discussion thread is created when a suggestion is created. | `suggestions.discussion_threads` |
| `/suggestions ban` | Ban a user from using suggestions. | `suggestions.ban` |
| `/suggestions unban` | Unban a user, allowing them to use suggestions. | `suggestions.ban.remove` |
| `/suggestions delete` | Delete a suggestion. | `suggestions.delete` |
| `/suggestions approve` | Mark a suggestion as approved. | `suggestions.state.approve` |
| `/suggestions deny` | Mark a suggestion as denied. | `suggestions.state.deny` |
| `/suggestions consider` | Mark a suggestion as considered. | `suggestions.state.consider` |
| `/suggestions add` | Mark a suggestion as added. | `suggestions.state.add` |

### Levels Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/levels add_reward` | Add a reward to the Level Rewards. | `levels.rewards.add` |
| `/levels remove_reward` | Remove a reward from the Level Rewards. | `levels.rewards.remove` |
| `/levels rewards` | View the Level Rewards for this server. | `levels.rewards` |
| `/levels award_xp` | Award a user XP points. | `levels.xp.award` |   
| `/levels remove_xp` | Remove XP points from a user. | `levels.xp.remove` |
| `/levels reset` | Reset a user's level and XP. | `levels.xp.reset` | 
| `/levels stats` | View a user's level stats. Leave empty to view your own. | `levels.stats` |
| `/levels leaderboard` | View the top leveled members on this server. | `levels.leaderboard` |
| `/levels message_xp` | Set the amount of XP given for sending a message. | `levels.message_xp` |
| `/levels toggle_embed` | Toggle whether the Level embed is sent upon a user leveling up. | `levels.embed` |
| `/levels channel` | Levelup messages channel, or leave empty for Auxdibot to reply to the current message. | `levels.channel` |

### Starboard Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/starboard channel` | Set the channel where starred messages are sent. | `starboard.settings.channel` |
| `/starboard reaction` | Set the starboard reaction for this server. | `starboard.settings.reaction` |
| `/starboard reaction_count` | Set the starboard reaction count for this server. | `starboard.settings.reaction_count` |

### Greetings Commands

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/join message` | Set the join message. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.join.message` |
| `/join embed_json` | Add an embed to the join message using custom JSON. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.join.embed_json` |
| `/join preview` | Preview the join message. | `greetings.join.preview` |
| `/join_dm message` | Set the join DM message. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.join_dm.message` |
| `/join_dm embed_json` | Add an embed to the join DM message using custom JSON. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.join_dm.embed_json` |
| `/join_dm preview` | Preview the join DM message. | `greetings.join_dm.preview` |
| `/leave message` | Set the leave message. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.leave.message` |
| `/leave embed_json` | Add an embed to the join message using custom JSON. (Placeholders are supported. Do /help placeholders for a list of placeholders.) | `greetings.leave.embed_json` |
| `/leave preview` | Preview the leave message. | `greetings.leave.preview` |

