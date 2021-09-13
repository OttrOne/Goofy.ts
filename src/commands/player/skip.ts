import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { skip } from '../../mods/player';

export = {
    name: 'skip',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Skips the current song.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        message.channel.send(skip(member).content);
    },
} as Command;
