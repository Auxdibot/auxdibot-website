---
title: Notifications
---

## Notifications

-----

|T|If you want to see the Embed from the source you specified for your feed, you will need to include the `{%FEED_LINK%}` in the `content` of your Embed Parameters.|T|

Auxdibot features Notification Feeds, which support YouTube (video created), Twitch (stream online), and RSS feeds. When an event occurs, a formatted message is sent to a channel of your choice.

Administrators can create a notification feed by running the commands `/notifications (rss|twitch|youtube) (channel) (url [rss]|username [twitch]|handle [youtube]) [...embed parameters]`.

When a notification feed is created, every two minutes (RSS/YouTube) or every time the user's Twitch channel goes online, Auxdibot will send out your notification data using the Discord Embed data you specified.

### Notification Commands

| Command  | Description |
| ------------- | ------------------- |
| `/notifications youtube (channel) (handle) [...embed parameters]`| Listen for youtube channel uploads using Auxdibot. |
| `/notifications rss (channel) (url) [...embed parameters]` | Listen for RSS feed updated using Auxdibot. |
| `/notifications twitch (channel) (username) [...embed parameters]`| Listen for streams on Twitch using Auxdibot. |
| `/notifications list`| List all Auxdibot notification feeds. |
| `/notifications delete (index)`| Delete an Auxdibot feed. |

### Placeholders

Notifications utilize placeholders. For example, for the author of the feed being sent (twitch channel display name, youtube username, RSS feed `<author>`), you can use the placeholder `{%FEED_AUTHOR%}` to replace `{%FEED_AUTHOR%}` with the author of the content.

| Placeholder  | Description |
| ------------- | ------------------- |
| `{%FEED_TITLE%}` | The title of the incoming feed content. |
| `{%FEED_CONTENT%}`| The content displayed inside of the incoming feed content (RSS). |
| `{%FEED_LINK%}`| The link to the incoming feed content. (twitch channel, youtube video, RSS feed `<link>`) |
| `{%FEED_AUTHOR%}`| The author of the incoming feed content. |
| `{%FEED_DATE%}`| The date the feed content was created. |
| `{%FEED_DATE_FORMATTED%}`| The date the feed content was created, formatted for Discord. |
| `{%FEED_DATE_UTC%}`| The date the feed content was created, formatted as a UTC date string. |
| `{%FEED_DATE_ISO%}`| The date the feed content was created, formatted as an ISO date string. |