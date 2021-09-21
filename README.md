# Goofy.ts
Simple musicbot based on [LexBot](https://github.com/OttrOne/lexbot) and [discord-player](https://www.npmjs.com/package/discord-player).

## Commands

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `-play`             | Plays a song or a playlist.             |
| `-pause`            | Pauses the current playlist.            |
| `-resume`           | Resumes the current playlist.           |
| `-shuffle`          | Shuffles the current playlist.          |
| `-skip`             | Skips the current song.                 |
| `-stop`             | Displays the full queue.                |
| `-queue`            | Stops the current playlist.             |

## Setup via (Docker) vontainer

Each commit in main leads into a docker images in the github container registry.

You can pull the image via
```bash
docker pull ghcr.io/ottrone/goofy.ts:latest
```

and run the bot via
```bash
docker run --env-file .env -d --restart unless-stopped ghcr.io/ottrone/goofy.ts:latest
```

Remember to rename the `example.env` file to `.env` before and enter your token.

## Setup from source (Based on LexBot)
1. Install all dependencies via `npm install` after cloning the repo.

1. Rename the `example.env` file to `.env` and add your Discord bot token and Guild-ID for slash commands. (not necessary for global slash commands)
```
TOKEN=
GUILD=
```
`.env` is part of the `.gitignore` file so changes won't be committed.

## npm Commands
| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `npm run prebuild`  | Extract version from package.json.      |
| `npm run build`     | Build the typescript code.              |
| `npm run lint`      | Runs the linter on the code.            |
| `npm run start`     | Runs the bot from the built JavaScript. |
| `npm run debug`     | Debug the TypeScript in watch mode.     |


## Adding new commands
To add new commands add a `.ts` file in `/commands/` or any subdirectory of `/commands/`.
The command implements the `Command` interface with the following required properties:
```javascript
export = {
    name: '',
    category: '',
    description: '',
    run: ({  }: CallbackOptions) => {
        // do stuff
    }
} as Command;
```
Check the `CallbackOptions` interface for possible properties.
`member` is available for every `CommandType`. `message` and `args` are only available for `NORMAL` commands aka `!command`s while `interaction` is only available for `SLASH` commands.

**Its mandatory to define the type if it's supposed to be `SLASH` command only**

Example:
```javascript
import { Command, CommandType } from '../interfaces/command';
import { CallbackOptions } from '../interfaces/CallbackOptions';

export = {
    name: 'ping',
    type: CommandType.SLASH,
    category: 'LexBot',
    description: 'Sends back pong',
    run: ({ interaction }: CallbackOptions) => {

        if (!interaction) return;
        interaction.reply('Pong!');
    },
} as Command;
```
Is the `type` set to `SLASH` or `BOTH` it will be added dynamically to the Discord command list. (Remember to set up a proper `run` function for it)
