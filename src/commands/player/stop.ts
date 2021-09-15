import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { stop } from '../../mods/player';
import logger from '../../core/logger';

export = {
    name: 'stop',
    aliases: ['clear'],
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Stops the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        try {
            await message.channel.send(stop(member).content);
        }
        catch (e) {
            logger.error(e);
        }
    },
} as Command;
