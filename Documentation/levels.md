---
title: Levels
---

## Levels

---

### Viewing Levels

Users on your server can view their level at any time by running the `/levels stats [user]` command. The top users on the server can be viewed by running the `/levels leaderboard` command.

### Level Rewards

Level Rewards are roles given to users when they reach a specific level. Administrators or members with permission can add a role as a Level Reward by running the command `/levels add_reward (role) (level)`.

Level Rewards can be removed using the `/levels remove_reward (level)` command, or by deleting the role on Discord.

### Give/Take XP

Administrators or members with permission can award or remove XP from members by running the command `/levels (award_xp|remove_xp) (xp) (user)`.

### Reset XP

Administrators or members with permission can reset a member's XP progress by running the command `/levels reset (user)`.

|!|Resetting the Levels for your server is dangerous. Level data will be lost forever. Only do this as a last resort!|!|
Additionally, Levels for the entire server can be reset by running the `/levels reset_all` command.

### Set Message XP

Administrators or members with permission can set the message XP for your server by running the command `/levels message_xp (xp)`. When a player sends a message on your server, they will receive the `message_xp` specified.

### Levelup Embed

When a user levels up, by default Auxdibot will reply to the message that caused the user to level up, notifying them of their level increase. Administrators or members with permission can set a channel where levelup messages are sent by running the command `/levels channel [channel]`. When a level channel is set, levelup messages are broadcast to that channel, and the user is pinged.

The embed sent for levelling up can be disabled/enabled by running the `/levels toggle_embed` command.
### Levels Commands


| Command | Description |
| --- | --- |
| `/levels add_reward (level) (role)` | Add a reward to the Level Rewards. |
| `/levels remove_reward (level)` | Remove a reward from the Level Rewards. |
| `/levels rewards` | View the Level Rewards for this server. |
| `/levels award_xp (xp) (user)` | Award a user XP points. |
| `/levels remove_exp (xp) (user)` | Remove XP points from a user. |
| `/levels reset (user)` | Reset a user's level and XP. |
| `/levels stats [user]` | View a user's level stats. Leave empty to view your own. |
| `/levels leaderboard` | View the top leveled members on this server. |
| `/levels message_xp (xp)` | Set the amount of XP given for sending a message. |
| `/levels toggle_embed` | Toggle whether the Level embed is sent upon a user leveling up. |
| `/levels channel [channel]` | Levelup messages channel, or leave empty for Auxdibot to reply to the current message. |
| `/levels reset_all` | Reset every member's level and XP. (WARNING: THIS CANNOT BE RECOVERED) |