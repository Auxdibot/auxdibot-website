---
title: AutoMod
---

## Warn Thresholds

-----

Warn Thresholds allow Auxdibot to issue a `punishment` after a user recieves a specified amount of `warns`. Administrators or users with permission can set up a warn threshold with `/moderation warns threshold (punishment) (warns)`. Set `warns` to 0 to disable warn thresholds.

| Command  | Description |
| ------------- | ------------------- |
| `/moderation warns threshold (punishment) (warns)`| Set the punishment to give for receiving warns on your server. (set warns to 0 to disable) |

## Blacklisted Phrases

-----

Auxdibot's Phrase Blacklist allows moderators to add a filter to their server, issuing a punishment to members who send a blacklisted phrase. Blacklisted phrases can be added with the `/moderation blacklist add (phrase)` command and can be removed using the `/moderation blacklist remove (phrase|index)`

Administrators can set the punishment that is issued to members who send a message containing a blacklisted phrase by running the `/moderation blacklist punishment (punishment)` command.

| Command  | Description |
| ------------- | ------------------- |
| `/moderation blacklist add (phrase)`| Add a blacklisted phrase to this server. |
| `/moderation blacklist punishment (punishment)`| Set the punishment given when a blacklisted phrase is used. |
| `/moderation blacklist list`| See a list of every blacklisted phrase on this server. |
| `/moderation blacklist remove (phrase|index)`| Remove a blacklisted phrase from the server. |

## Spam Limits

-----

Administrators can set the limit for the amount of messages/attachments/invites that can be sent in a duration of time. Administrators can set the attachments/messages/invites limit for your server by running the commands `/moderation (spam|attachments|invites) set (messages|invites|attachments) (duration)` where `messages`/`invites`/`attachments` is the max amount of messages/invites/attachments a member of your server can send in `duration` (using timestamps, ex. 1m = 1 minute, 1h = 1 hour, 30s = 30 seconds).

Administrators can set the punishment that is issued, along with the reason for issuing the punishment, when a limit is broken by running the commands `/moderation (spam|attachments|invites) punishment (punishment) [reason]`.

| Command  | Description |
| ------------- | ------------------- |
| `/moderation spam set (messages) (duration)`| Set the spam limit for this server. |
| `/moderation spam punishment (punishment) [reason]`| Set the punishment for spam on this server. |
| `/moderation invites set (invites) (duration)`| Set the invites spam limit for this server. |
| `/moderation invites punishment (punishment) [reason]`| Set the punishment for invites spam on this server. |
| `/moderation attachments set (attachments) (duration)`| Set the attachments spam limit for this server. |
| `/moderation attachments punishment (punishment) [reason]`| Set the punishment for attachments spam on this server. |

## AutoMod Exceptions

----

Administrators can make a role exempt from punishments issued by AutoMod by adding the role to the list of role exceptions. Administrators can add a role to the list of role exceptions by running the command `/moderation exceptions add (role)`. Once a role is added to the role exceptions for your server, it can be removed by running the command `/moderation exceptions remove (role|index)`

| Command  | Description |
| ------------- | ------------------- |
| `/moderation exceptions add (role)`| Add a role exception to automod. The role added will not be affected by limits or blackisted phrases. |
| `/moderation exceptions remove (role|index)`| Remove an AutoMod role exception. If you've deleted the role, use the index parameter, which is the placement of the item on /moderation exceptions list. |
| `/moderation exceptions list`| List the roles that are excempt from AutoMod punishments and limits. |