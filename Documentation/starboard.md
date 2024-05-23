---
title: Starboard
---

## Starboard

-----

Auxdibot's Starboard feature allows you to create a channel that acts as a "Global Pins" system for your server, acting as a way to showcase the funniest posts on your server!

### Setting up a Starboard



Administrators or members with permission can create a new Starboard by running the command `/starboard board create (name) (channel) [reaction] [reaction_count]`. When a starboard is created, users can react with the reaction that the administrator has specified, and once a message reaches the reaction count that the administrator has specified, the message is added to the Starboard.

| Option | Description |
| ------------- | ------------------- |
| `name` | The name of the starboard. (Must be unique.) |
| `channel` | The channel to create the starboard in. Messages will be posted to this channel once they receive the required amount of reactions. |
| `reaction` | An emoji or server emoji to use as the reaction that users must react to messages with to post them to the starboard. |
| `reaction_count` | The amount of reactions a message must receive to be posted to the starboard. |

### Changing Starboard Settings

The settings for every starboard can be changed through the dashboard or the commands `/starboard settings (self_star|starboard_star)`.

Administrators or members with permission can run the `/starboard settings self_star (self_star)` command to allow/deny users from starring their own messages.

Administrators or members with permission can run the `/starboard settings starboard_star (starboard_star)` command to allow/deny users from starring messages directly through the starboard.

### Modifying a Starboard

|!|When a Starboard channel is modified, all messages posted in the previous starboard channel will no longer function.|!|

Once a starboard is created, it can be modified by running the `/starboard board (channel|reaction|reaction_count)` commands.

### Deleting a Starboard Message

A starboard message can be deleted by deleting the message in the starboard channel, or deleting the message itself.

### Star Levels

Currently, star levels are unavailable and will come available for Auxdibot Premium users.

By default, if you specify the `reaction` of a starboard to be "⭐", the starboard will use 4 default star levels. (⭐,🌟,✨,💫)

### Starboard Commands

| Command  | Description |
| ------------- | ------------------- |
| `/setup starboard`| Automatically configure a starboard for your server. |
| `/starboard settings self_star (self_star)`| Set whether a user can star their own messages. |
| `/starboard settings starboard_star (starboard_star)`| Set whether a user can star messages directly through a starboard. |
| `/starboard board create (name) (channel) [reaction] [reaction_count]`| Create a new starboard for this server. |
| `/starboard board delete (name)`| Delete a starboard from this server. |
| `/starboard board channel (name) (channel)`| Set the channel for a starboard on your server. |
| `/starboard board reaction (name) (reaction)`| Set the starboard reaction for this server. |
| `/starboard board reaction_count (name) (reaction_count)`| Set the starboard reaction count for this server. |
| `/starboard board list`| List all starboards for this server. |
