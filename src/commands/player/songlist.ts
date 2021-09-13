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
        message.channel.send(songlist(member).content);
    },
} as Command;
