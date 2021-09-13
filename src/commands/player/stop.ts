import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { stop } from '../../mods/player';

export = {
    name: 'stop',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Stops the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        message.channel.send(stop(member).content);
    },
} as Command;
