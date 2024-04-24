---
title: Schedules
---

## Schedules

-----

|T|For more information on Embed parameters, view the [Embeds](/docs/embeds) section.|T|



Auxdibot Schedules allow for users to create reminders/messages that are sent on a scheduled basis.

Administrators can schedule a message by running the command `/schedule (channel) (interval [as timestamp]) [times_to_run] [start_date] [...embed parameters]`

A schedule can be removed by running the command `/schedule remove (index)` where index is the position of the schedule on `/schedule list`.

### Schedule Commands

|T|The `start_date` parameter can take the form of an ISO date (1970-01-01T00:00:00.000Z), a UNIX Timestamp (0), or a normal date (01/01/1970).|T|

| Command  | Description |
| ------------- | ------------------- |
| `/schedule message (channel) (interval) [times to run] [start_date] [...embed parameters]`| Schedule a message using Auxdibot. |  
| `/schedule list` | List the schedules running on your server. |
| `/schedule remove (index)`| Remove a schedule from your server. It will never run again after deletion. |
| `/schedule preview [index]`| Preview a scheduled message. |
| `/schedule edit (index) [channel] [timestamp] [times_to_run] [...embed parameters]`| Edit an existing Schedule by Auxdibot. |

