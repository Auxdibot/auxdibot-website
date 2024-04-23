---

title: Roles
---

## Reaction Roles

-----

Auxdibot includes Reaction Roles, a feature allowing members to add/remove roles by interacting with a message on your server!

### Creating Reaction Roles

|T|For more information on Embed parameters, view the [Embeds](/docs/embeds) section.|T|

Auxdibot's reaction roles come in various shapes and sizes. Administrators or members with permission can create a reaction role (with an automatically created embed) by running the command `/reaction_roles add (channel) (roles) [title] [type]`.

Administrators or members with permission can create a reaction role with a custom embed by running the command `/reaction_roles add_custom (channel) (roles) [title] [type] [...embed parameters]` .

When creating a reaction role, for the `roles` parameter, you need to specify an emoji, followed by a space, followed by the role to receive when reacting with that emoji. (ex. `😀 @Role1 🤖 @Role2`)

**Example**: `/reaction_roles add channel:#my-channel title:My Reaction Role roles:😀 @Role1 🤖 @Role2`

<p class="image">
<img alt="Reaction role image" src="/docs/_assets/reaction_role.png" width=450/>
<em>A reaction role with the "Select Menu" type.</em>
</p>

### Reaction Role Types

You can specify a reaction role `type` parameter to decide how users interact with your reaction role.

| Type | Description |
|-----------|-------------|
| `Default` | The default method for reaction roles. The users reaction is removed and they will receive/lose the role. |
| `Select One`   |  The default method for reaction roles, except the user can only have one of the roles specified. |
| `Sticky` | The users reaction is not removed, and they will receive/lose the role. |
| `Sticky (Select One)` | The users reaction is not removed, except the user can only have one of the roles specified. |
| `Discord Button` | Utilize Discord Buttons instead of reactions on the Discord Embed. |
| `Discord Button (Select One)` | Utilize Discord Buttons instead of reactions on the Discord Embed, except the user can only have one of the roles specified. |
| `Select Menu` | Utilize Discord Select Menus instead of reactions on the Discord Embed, allowing users to select multiple roles at one time. |
| `Select Menu (Select One)` | Utilize Discord Select Menus instead of reactions on the Discord Embed, except the user can only have one of the roles specified. |

### Webhook Users (Advanced)

|T|You can read more about using Webhook Users [here](/docs/embeds#webhookusersadvanced).|T|

When a Webhook User is provided in the creation of a reaction role, the `Button` and `Select Menu` types are blocked from being used.

### Reaction Roles Commands



| Command | Description |
| --- | --- |
| `/reaction_roles add (channel) (roles) [type]` | Add a reaction role to the server. |
| `/reaction_roles add_custom (channel) (roles) [type] [...embed parameters]` | Add a reaction role to the server with custom Embed parameters. |
| `/reaction_roles add_json (channel) (roles) [type] (json)` | Add a reaction role to the server with custom Discord Embed JSON. |
| `/reaction_roles add_message (messageID) (roles) [type]` | Add a reaction role to the server using an existing message. |
| `/reaction_roles edit [message_id] [index] [json, overrides embed parameters] [...embed parameters]` | Edit a reaction role's embed on this server. |
| `/reaction_roles list` | List the reaction roles on this server. |
| `/reaction_roles remove [message_id] [index]` | Remove a reaction role from the server, deleting the message. |
 
## Join Roles

-----

Join Roles allow a user to receive roles when they join your server! Administrators or members with permission can add a Join Role by running the command `/join_roles add (role)`.

### Join Roles Commands

| Command | Description |
| --- | --- |
| `/join_roles add (role)` | Add a role to be assigned when a member joins the server. |
| `/join_roles remove (role|index)` | Remove a role that is assigned when a member joins the server. If you've deleted the role, use the index parameter, which is the placement of the item on /join_roles list. |
| `/join_roles list` | List the roles that are assigned when a member joins the server. |
 
## Sticky Roles

-----

Sticky Roles (or "Rejoin" Roles) are roles that are "stuck" to the user when they leave the server. If the user leaves the server and rejoins, the roles that they had that were added as Sticky Roles are given back to the user.

Administrators or members with permission can add a Sticky Role by running the command `/sticky_roles add (role)`.

### Sticky Roles Commands

| Command | Description |
| --- | --- |
| `/sticky_roles add (role)` | Add a role to be kept when a member rejoins the server. |
| `/sticky_roles remove (role|index)` | Remove a role that is kept when a member rejoins the server. If you've deleted the role, use the index parameter, which is the placement of the item on /sticky_roles list. |
| `/sticky_roles list` | List the roles that are kept when a member rejoins the server. |

## Massrole

-----

|T|Other server functions may be unavailable when utilizing massrole on large servers.|T|

Administrators or members with permission can give/take a role from every member on the server using the `/massrole (give|take) (role)` commands.

### Massrole Commands

| Command | Description |
| --- | --- |
| `/massrole give (role)` | Give everybody a role. |
| `/massrole take (role)` | Take away a role from every user. |
 