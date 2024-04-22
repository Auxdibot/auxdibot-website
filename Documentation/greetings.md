---
title: Greetings
---

## Greetings

---



Greetings allow Auxdibot to broadcast messages announcing members joining and leaving your server.

Administrators or members with permission can set where join/leave messages are broadcast by running the command `/greetings channel [channel]`. When a greetings channel is not set, no Join/Leave messages are sent.

### Greeting Types

|!|Join DM messages will only be privately messaged to a user if their Discord privacy settings allow it.|!|

Greeting messages are sent under different greeting types, which can be individually customized.


| Type | Description |
| --- | --- |
| Join | Broadcast to the greetings channel when a member joins your server. |
| Leave | Broadcast to the greetings channel when a member leaves your server. |
| Join DM | Sent privately to a member when they join your server. |


### Customizing Greetings

|T|For more information on Embed parameters, view the [Embeds](/docs/embeds) section.|T|

You can modify the Join/Leave/Join DM messages at any time by running the `/(join|leave|join_dm) message [...embed parameters]` commands. Additionally, you can preview the Join/Leave/Join DM messages by running the commands `/(join|leave|join_dm) preview`.

### Greetings Commands

| Command | Description |
| --- | --- |
| `/greetings channel (channel)` | Set the greetings channel for this server, where join and leave messages are broadcast. |
| `/join message [...embed parameters]` | Set the join message. |
| `/join embed_json (json)` | Add an embed to the join message using custom JSON. |
| `/join preview` | Preview the join message. |
| `/join_dm message [...embed parameters]` | Set the join DM message. |
| `/join_dm embed_json (json)` | Add an embed to the join DM message using custom JSON. |
| `/join_dm preview` | Preview the join DM message. |
| `/leave message [...embed parameters]` | Set the leave message. |
| `/leave embed_json (json)` | Add an embed to the leave message using custom JSON. |
| `/leave preview` | Preview the leave message. |