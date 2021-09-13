import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { pause } from '../../mods/player';

export = {
    name: 'pause',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Pauses the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        message.channel.send(pause(member).content);
    },
} as Command;
