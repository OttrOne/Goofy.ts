import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { pause } from '../../mods/player';
import logger from '../../core/logger';

export = {
    name: 'pause',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Pauses the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        try {
            await message.channel.send(pause(member).content);
        }
        catch (e) {
            logger.error(e);
        }
    },
} as Command;
