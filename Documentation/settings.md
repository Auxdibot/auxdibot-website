<div id="header" align="center">
  <img src="https://bot.auxdible.me/icon.png" width=225/>
  <h1 id="welcome">Settings</h1>
</div>

Auxdibot features many commands that will allow you to view and edit Auxdibot's settings for your server.

## /settings

Auxdibot's main `/settings` command allows you to view Auxdibot's configuration for your server, edit the mute role, join and leave messages channel, and log channel.

Editing Auxdibot's mute role with `/settings mute_role` will set the mute role to the role specified. Auxdibot will not accept a role if it is higher than your current role (and you do not own the server) or if the role is higher than Auxdibot's highest role. You can remove the mute role by not providing a `role` argument. If there is no mute role on your server, Auxdibot will use Discord's timeout system for muting users.

You can change the join/leave messages channel with `/settings join_leave_channel`. If there is no join/leave messages channel, join DM messages will still be sent, but no leave/join embeds will be set. If you want to disable greetings entirely, consider using `/modules disable Greetings`.

You can set the log channel with `/settings log_channel`. Any Auxdibot action that is logged will be sent to that channel. You can disable logging by leaving the `channel` argument empty in the `/settings log_channel` command.

Running `/settings view` will present you with an organized embed containing all the information about your server's settings. You can see a full list of all your join roles, sticky roles, disabled modules, level rewards, and more.

<p class="image">
<img alt="Settings View" src="/docs/_assets/settings_view.png" width=450/>
<em>The "Server Settings" embed for Auxdibot.</em>
</p>



| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/settings view`  | Change settings for the server. | `settings.view` |
| `/settings join_leave_channel` | Change the channel where join and leave messages are broadcast. | `settings.join_leave_channel` |
| `/settings log_channel` | Change the log channel for the server, where all actions are logged to. | `settings.log_channel` |
| `/settings mute_role` | Change the mute role for the server, which is automatically assigned to muted users. | `settings.mute_role` |

## Enabling and Disabling Modules

If you don't like one of Auxdibot's modules or one of Auxdibot's modules is conflicting with another bot, it can be disabled and enabled using the `/modules` command. Disabling a feature will disable all Auxdibot commands attached to that module and disable any recurring actions for that module on your server.

| Command Name  | Command Description | Command Permission |
| ------------- | ------------------- | ------------------ |
| `/modules enable`  | Enable Auxdibot's modules. | `settings.modules.enable` |
| `/modules disable` | Disable Auxdibot's modules. | `settings.modules.disable` |

## Dashboard

Modules can be enabled and disabled from Auxdibot's dashboard. Auxdibot's dashboard also features a "Reset Bot" option, and the ability to change the bot's nickname.

<p class="image">
<img alt="Dashboard Settings" src="/docs/_assets/dashboard_settings.png" width=450/>
<em>The dashboard settings for Auxdibot, allowing you to change the bot's nickname, reset the bot's settings, and disable/enable modules.</em>
</p>
