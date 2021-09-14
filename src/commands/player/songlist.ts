import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { songlist } from '../../mods/player';

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
        catch {
            message.reply('The Playlist might be to long :c');
        }
    },
} as Command;
