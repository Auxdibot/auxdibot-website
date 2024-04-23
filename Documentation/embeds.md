---
title: Embeds
---

## Embeds

---

|!|Features that utilize Embeds are better experienced on the Auxdibot Dashboard!
If your Embed produces an error, which is most likely caused by malformed syntax, you will recieve a generic error message.
|!|

Embeds are utilized in Reaction Roles, Schedules, Notifications, and creating Embed messages.

### Embed Parameters

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

### Embed Fields

|T|Embeds created with slash commands do not support inline fields.|T|

For commands that use Auxdibot's embed creation parameters, there is a `fields` parameter. For every field, use `|d|` to seperate field titles from their descriptions, and `|s|` to seperate fields. 
Fields Example

`Field 1|d|Field description for Field 1...|s|Field 2|d|Field description for Field 2...`

*is the equivilant to*

**Field 1**

Field Description for Field 1…

**Field 2**

Field description for Field 2…

### Editing Embeds

Administrators or members with permission can edit any Embeds sent by Auxdibot using the `/embed edit (message_id) [...embed parameters]` command, where `message_id` is a valid Discord message ID.

### JSON (Advanced)

Discord Embed JSON is supported on Discord. Administrators or members with permission can obtain the JSON data for any Embed by running the command `/embed json (message_id)` where `message_id` is a valid Discord message ID.

Administrators or members with permission can create an Embed using Discord Embed JSON by running the command `/embed create_json (channel) (json)`.

### Webhook Users (Advanced)

|T|You can read more about Discord Webhooks or how to obtain a Webhook URL [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).|T|

When running a command to create a Discord Embed (or Reaction Role!), a `webhook_url` parameter can be specified. (`https://discord.com/api/webhooks/XXXXX`) The Webhook's channel MUST match the channel Auxdibot is sending the Embed to, or you will not be able to send the Discord Embed.

### Embed Commands

| Command | Description |
| --- | --- |
| `/embed create (channel) [...embed parameters]` | Create an embed with Auxdibot. |
| `/embed create_json (channel) (json)` | Create an embed with Auxdibot using valid Discord Embed JSON data. |
| `/embed edit (message_id) [...embed parameters]` | Edit an existing Embed by Auxdibot. |
| `/embed edit_json (message_id) (json)` | Edit an existing Embed by Auxdibot using valid Discord Embed JSON data. |
| `/embed json (message_id)` | Get the Discord Embed JSON data of any Embed on your server. |

## Placeholders

---

|T|You can view this list using Auxdibot at any time by running the command `/help placeholders`|T|

Some Embeds, such as [Notification Feed messages](/docs/notifications), will utilize placeholders in Auxdibot. When a placeholder is included in a message, it is substituted for the content it represents.

| Placeholder | Description |
| --- | --- |
| `{%SERVER_MEMBERS%}` | Get the total amount of members in the server. |
| `{%SERVER_NAME%}` | Get the server name. |
| `{%SERVER_ID%}` | Get the server ID. |
| `{%SERVER_ICON_512%}` | Get a 512x512px server icon URL. (Can be used as an image_url or thumbnail_url!) |
| `{%SERVER_ICON_128%}` | Get a 128x128px server icon URL. (Can be used as an image_url or thumbnail_url!) |
| `{%SERVER_ACRONYM%}` | Get the server's acronym. |
| `{%SERVER_CREATED_DATE%}` | Get the date the server was created. |
| `{%SERVER_CREATED_DATE_FORMATTED%}` | Get the date the server was created formatted for Discord. |
| `{%SERVER_CREATED_DATE_UTC%}` | Get the date the server was created as a UTC date. |
| `{%SERVER_CREATED_DATE_ISO%}` | Get the date the server was created as an ISO date. |
| `{%SERVER_TOTAL_PUNISHMENTS%}` | Get the total amount of punishments on this server. |
| `{%MEMBER_ID%}` | Get the ID of the member being interacted with. |
| `{%MEMBER_TAG%}` | Get the tag of the member being interacted with. |
| `{%MEMBER_MENTION%}` | Mention the member being interacted with. |
| `{%MEMBER_CREATED_DATE%}` | Get the date the member joined discord. |
| `{%MEMBER_CREATED_DATE_FORMATTED%}` | Get the date the member joined Discord formatted for Discord. |
| `{%MEMBER_CREATED_DATE_UTC%}` | Get the date the member joined Discord as a UTC date. |
| `{%MEMBER_CREATED_DATE_ISO%}` | Get the date the member joined Discord as an ISO date. |
| `{%MEMBER_JOIN_DATE%}` | Get the date the member joined this server. |
| `{%MEMBER_JOIN_DATE_FORMATTED%}` | Get the date the member joined this server formatted for Discord. |
| `{%MEMBER_JOIN_DATE_UTC%}` | Get the date the member joined this server as a UTC date. |
| `{%MEMBER_JOIN_DATE_ISO%}` | Get the date the member joined this server as an ISO date. |
| `{%MEMBER_HIGHEST_ROLE%}` | Get the highest role the member has. |
| `{%MEMBER_IS_OWNER%}` | Get "Yes" or "No" depending on if the member is owner. |
| `{%MEMBER_IS_ADMIN%}` | Get "Yes" or "No" depending on if the member has Administrator permissions. |
| `{%MEMBER_AVATAR_512%}` | Get a 512x512px member avatar URL. (Can be used as an image_url or thumbnail_url!) |
| `{%MEMBER_AVATAR_128%}` | Get a 128x128px member avatar URL. (Can be used as an image_url or thumbnail_url!) |
| `{%MEMBER_EXPERIENCE%}` | Get the experience of the member. |
| `{%MEMBER_LEVEL%}` | Get the level of the member. |
| `{%MEMBER_XP_TILL%}` | Get the experience needed to reach the next level. |
| `{%MEMBER_TOTAL_PUNISHMENTS%}` | The total amount of punishments this user has. |
| `{%MEMBER_LATEST_PUNISHMENT%}` | The type of the latest punishment this user has. |
| `{%MEMBER_LATEST_PUNISHMENT_ID%}` | The punishment ID of the latest punishment this user has. |
| `{%MEMBER_LATEST_PUNISHMENT_DATE%}` | The date of the latest punishment this user has. |
| `{%MEMBER_LATEST_PUNISHMENT_DATE_FORMATTED%}` | The date of the latest punishment this user has formatted for Discord. |
| `{%MEMBER_LATEST_PUNISHMENT_DATE_UTC%}` | The date of the latest punishment this user has as a UTC date. |
| `{%MEMBER_LATEST_PUNISHMENT_DATE_ISO%}` | The date of the latest punishment this user has as an ISO date. |
| `{%MESSAGE_DATE%}` | The date of the message this placeholder is being sent with. |
| `{%MESSAGE_DATE_FORMATTED%}` | The date of the message this placeholder is being sent with formatted for Discord. |
| `{%MESSAGE_DATE_UTC%}` | The date of the message this placeholder is being sent with as a UTC date. |
| `{%MESSAGE_DATE_ISO%}` | The date of the message this placeholder is being sent with as an ISO date. |
| `{%SUGGESTION_ID%}` | The ID of the suggestion. |
| `{%SUGGESTION_STATE%}` | The state of the suggestion. |
| `{%SUGGESTION_HANDLER_MENTION%}` | The mention of the suggestion handler. |
| `{%SUGGESTION_HANDLED_REASON%}` | The reason the suggestion was handled. |
| `{%SUGGESTION_CONTENT%}` | The content of the suggestion. |
| `{%SUGGESTION_DATE%}` | The date of the suggestion. |
| `{%SUGGESTION_DATE_FORMATTED%}` | The date of the suggestion formatted for Discord. |
| `{%SUGGESTION_DATE_UTC%}` | The date of the suggestion as a UTC date. |
| `{%SUGGESTION_DATE_ISO%}` | The date of the suggestion as an ISO date. |
| `{%STARBOARD_MESSAGE_ID%}` | The ID of the starboard message. |
| `{%STARBOARD_MESSAGE_CONTENT%}` | The content of the starboard message. |
| `{%STARBOARD_MESSAGE_STARS%}` | The amount of stars the starboard message has. |
| `{%STARBOARD_MESSAGE_DATE%}` | The date of the starboard message. |
| `{%STARBOARD_MESSAGE_DATE_FORMATTED%}` | The date of the starboard message formatted for Discord. |
| `{%STARBOARD_MESSAGE_DATE_UTC%}` | The date of the starboard message as a UTC date. |
| `{%STARBOARD_MESSAGE_DATE_ISO%}` | The date of the starboard message as an ISO date. |
| `{%FEED_TITLE%}` | The title of the feed. |
| `{%FEED_CONTENT%}` | The content of the feed. |
| `{%FEED_LINK%}` | The link of the feed. |
| `{%FEED_AUTHOR%}` | The author of the feed. |
| `{%FEED_DATE%}` | The date of the feed. |
| `{%FEED_DATE_FORMATTED%}` | The date of the feed formatted for Discord. |
| `{%FEED_DATE_UTC%}` | The date of the feed as a UTC date. |
| `{%FEED_DATE_ISO%}` | The date of the feed as an ISO date. |