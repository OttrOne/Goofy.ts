import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { shuffle } from '../../mods/player';
import logger from '../../core/logger';

export = {
    name: 'shuffle',
    aliases: ['s'],
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Shuffles the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        try {
            await message.channel.send(shuffle(member).content);
        }
        catch (e) {
            logger.error(e);
        }
    },
} as Command;
