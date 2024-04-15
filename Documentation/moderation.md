---

title: Moderation
---

## Punishments

-----

### Issuing/Revoking Punishments

Auxdibot has four primary punishment types: Warns, Mutes, Kicks, and Bans. Administrators or members with permission can run the commands `/punish (warn|kick|mute|ban) (user) [reason] [duration (mute/ban only)]` to create a punishment.

### Viewing Punishments

When a punishment is created, it can be viewed again by running the command `/punishment view (punishment_id)`. If a moderator wishes to view a user's record of punishments, it can be quickly accessed with the `/user` or `/punishment record [user]` commands.

A ban/mute can be revoked by a moderator by running the `/punish (unmute|unban) (user)` commands.

### Editing Punishment Content

Administrators or members with permission can run the commands `/moderation settings (send_reason|send_moderator) (send)` to change whether the moderator who issued the punishment or the reason the moderator issued the punishment are displayed to the user.

### Mute Role

|!|Do not set your mute role to a role you are already utilizing. Auxdibot will automatically configure permissions for that role, and any Discord permission you may have for that role in any channel will be overwritten.|!|

By default, Auxdibot utilizes Discord's Timeout system for issuing mutes to members. Permanent mutes cannot be issued if your server utilizes Discord's Timeout system. Administrators can set the mute role for your server by running the command `/moderation settings mute_role (role)`
### User Embed

Auxdibot features a `/user` command. Moderators can run the `/user (user)` command to view information about a user. In this menu, you can view their full punishment history or issue/revoke a punishment. All punishments issued from the User Embed are permanent.

<p class="image">
<img alt="User Embed" src="/docs/_assets/user_embed.png" width=450/>
<em>The Auxdibot User management Embed, giving moderators easy access to punishment methods and the user's punishment record!</em>
</p>

### Punishment Commands

| Command  | Description |
| ------------- | ------------------- |
| `/punish warn (user) [reason]`| Warns a user, giving them a DM warning (if they have DMs enabled) and adding a warn to their record on the server. |
| `/punish mute (user) [reason] [duration]` | Mutes a user, making them unable to talk in the server and adding a mute to their record on the server. Default duration is permanent. |
| `/punish kick (user) [reason]`| Kicks a user, removing them from the server and adding a kick to their record on the server. |
| `/punish ban (user) [reason] [delete_message_days]`| Bans a user, removing them from the server and adding a ban to their record on the server. Default duration is permanent. `delete_message_days` is how many days back the user's message history should be deleted. |
| `/punish unmute (user)`| Unmutes a user if they are currently muted. |
| `/punish unban (user)`| Unbans a user if they are currently banned. For banned members, use their user ID. |
| `/punishment view (punishment_id)`| View a punishment. |
| `/punishment delete (punishment_id)`| Delete a punishment. |
| `/punishment latest`| View the last 10 punishments. |
| `/punishment record (user)`| View a user's punishment record. |
| `/moderation settings send_reason (send)`| Change whether users are sent the reason for their punishment. |
| `/moderation settings send_moderator (send)`| Change whether users are sent the name of the moderator that punished them. |
| `/moderation settings mute_role [role]`| Change the role that is assigned to muted users for the server. |

## Channel Locking

-----

|!|If Auxdibot is reset while a channel is still locked, Administrators will need to manually clear the Discord permissions set for any locked channels.|!|

Administrators or members with permission can run the commands `/(lock|unlock) channel [channel] [reason] [duration]` to lock/unlock a channel on your server. When a channel is locked, it cannot be interacted with by members of your server. Administrators can lock every channel on the server by running the commands `/(lock|unlock) server [reason] [duration]`.

| Command  | Description |
| ------------- | ------------------- |
| `/lock channel [channel] [reason] [duration]`| Lock a channel. Run /unlock channel to unlock it again. |
| `/lock server [reason] [duration]` | Lock the entire server. Run /unlock server to unlock it again. |
| `/unlock channel [channel]`| Unlock a channel. Run /lock channel to lock it again. |
| `/unlock server`| Unlock the entire server. Run /lock server to lock it again. |

## Reporting

-----

Users can submit reports to a channel of your choice by running the `/report (message) [user]` command. 

Administrators can optionally specify a role to be pinged when a report is sent by running the command `/moderation reports role [role]`.

| Command  | Description |
| ------------- | ------------------- |
| `/moderation reports channel [channel]`| Change the Reports Channel for this server. |
| `/moderation reports role [role]` | Change the Reports Role for this server. |
| `/moderation reports ban (user)`| Ban a user from making reports. |
| `/moderation reports unban (user)`| Unban a user from making reports. |

## Message Purging

-----

|!|Exercise caution using the /purge all and /purge filter commands. /purge filter is RegEx sensitive (`.` represents all characters but `\\.` represents "."). Pinned messages and Auxdibot messages are deleted.|!|

Administrators can purge messages with the `/purge (all|attachments|embeds|filter|invites|user) (amount)` commands. The `amount` parameter represents the amount of messages that you would like to delete.

| Command  | Description |
| ------------- | ------------------- |
| `/purge all (amount)`| Purge messages regardless of content or user. |
| `/purge user (amount) (user)` | Purge messages in a channel by user. |
| `/purge filter (amount) (filter)`| Purge messages in a channel by a filter (Uses RegEx!) |
| `/purge attachments (amount)`| Purge messages based on whether they have attachments. |
| `/purge invites (amount)`| Purge messages based on whether they have invites. |
| `/purge embeds (amount)`| Purge messages based on whether they have embeds. |
