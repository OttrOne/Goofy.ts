import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { play } from '../../mods/player';

export = {
    name: 'play',
    aliases: ['p'],
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    expectedArgs: '<link | song name>',
    description: 'Plays a song or a playlist.',
    minArgs: 1,
    run: async ({ message, member, args }: CallbackOptions) => {

        if (!message) return;
        if (!args) return;
        if (args?.length === 0) return;
        message.channel.send((await play(args.join(' '), member, message.channel)).content);
    },
} as Command;
