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
