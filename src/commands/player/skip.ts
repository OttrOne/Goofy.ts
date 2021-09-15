import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { skip } from '../../mods/player';
import logger from '../../core/logger';

export = {
    name: 'skip',
    aliases: ['next'],
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Skips the current song.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        try {
            await message.channel.send(skip(member).content);
        }
        catch (e) {
            logger.error(e);
        }
    },
} as Command;
