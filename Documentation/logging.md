---

title: Logging
---

## Logs

-----
When an action is logged on Auxdibot, your latest log will be updated and a log will be sent to the log channel on your server. The log channel can be changed with the command `/settings log_channel`.

<p class="image">
<img alt="Log Embed" src="/docs/_assets/log_embed.png" width=450/>
<em>The log embed sent to the log channel, which contains additional information about the action that has occurred.</em>
</p>

### Viewing Logs

Administrators or members with permission can view the 50 latest logs on your server by running the `/logs latest` command. 

## Log Actions

-----

Auxdibot will log the following actions on your server. You can view this list at any time by running `/logs actions`.

| Log Action | Action Description |
| ------------- | ------------------- |
| Log Channel Changed | The log channel on your server was changed. |
| Mute Role Changed | The mute role on your server was changed. |
| Warn | A member of your server was warned. |
| Kick | A member of your server was kicked. |
| Mute | A member of your server was muted. |
| Ban | A member of your server was banned. |
| Unmute | A member of your server was unmuted. |
| Unban | A member of your server was unbanned. |
| Member Join | A new member has joined your server. |
| Member Leave | A member has left your server. |
| Member Server Deafened | A member has been server deafened on voice. |
| Member Server Muted | A member has been server muted on voice. |
| Punishment Expired | A punishment has expired. |
| Punishment Deleted | A punishment has been deleted. |
| Channel Created | A channel has been created. |
| Channel Deleted | A channel has been deleted. |
| Thread Created | A thread has been created. |
| Thread Deleted | A thread has been deleted. |
| Message Edited | A message on your server has been edited. |
| Message Deleted | A message on your server has been deleted. |
| Join/Leave Channel Changed | The join/leave channel has been changed. |
| Join Role Added | A join role has been added. |
| Join Role Removed | A join role has been removed. |
| Sticky Role Added | A sticky role has been added. |
| Sticky Role Removed | A sticky role has been removed. |
| Reaction Role Added | A reaction role has been sent. |
| Reaction Role Removed | A reaction role has been removed. |
| Reaction Role Edited | A reaction role has been edited. |
| Massrole Given | A role has been massrole given. |
| Massrole Taken | A role has been massrole taken. |
| Suggestion Created | A suggestion has been created. |
| Suggestions Channel Changed | The suggestions channel has been changed. |
| Suggestions Updates Channel Changed | The suggestions update channel has been changed. |
| Suggestions Auto Delete Changed | The suggestions auto delete option has been changed. |
| Suggestions Thread Creation Changed | The suggestions thread creation option has been changed. |
| Suggestion Deleted | A suggestion has been deleted. |
| Starboard Channel Changed | The starboard channel has been changed. |
| Starboard Reaction Changed | The starboard reaction has been changed. |
| Starboard Reaction Count Changed | The starboard reaction count has been changed. |
| Starboard Message Deleted | A starboard message has been removed from the starboard. |
| Scheduled Message Created | A scheduled message has been created. |
| Scheduled Message Deleted | A scheduled message has been deleted. |
| Level Channel Changed | The level channel has been changed. |
| Level Reward Created | A level reward was created. |
| Level Reward Deleted  | A level reward was deleted. |
| Channel Locked | A channel has been locked. |
| Channel Unlocked | A channel has been unlocked. |
| Server Locked | The server has been locked. |
| Server Unlocked | The server has been unlocked. |
| Reports Channel Changed | The reports channel has been changed. |
| Reports Role Changed | The reports role has been changed. |
| Notification Created | A notification feed has been created. |
| Notification Deleted | A notification feed has been deleted. |
| Command Rules Changed | The command rules for this server have been changed. |
| Error | A silent error has occurred. |

### Filtering Log Actions

Log Actions can be filtered with the `/logs filter (log)` command. When a log is filtered, it will no longer be logged to your log channel. You can unfilter the log by running the `/logs filter (log)` command again.