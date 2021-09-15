import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { songlist } from '../../mods/player';
import logger from '../../core/logger';

export = {
    name: 'queue',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Resumes the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        try {
            await message.channel.send(songlist(member).content);
        }
        catch (e) {
            message.channel.send('The Playlist might be to long :c');
            logger.error(e);
        }
    },
} as Command;
