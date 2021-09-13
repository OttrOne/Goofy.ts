import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { shuffle } from '../../mods/player';

export = {
    name: 'shuffle',
    aliases: ['s'],
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Shuffles the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        message.channel.send(shuffle(member).content);
    },
} as Command;
