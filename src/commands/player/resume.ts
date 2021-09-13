import { Command, CommandType } from '../../interfaces/command';
import { CallbackOptions } from '../../interfaces/CallbackOptions';
import { resume } from '../../mods/player';

export = {
    name: 'resume',
    type: CommandType.NORMAL,
    category: 'DJ Goofy',
    description: 'Resumes the current playlist.',
    run: async ({ message, member }: CallbackOptions) => {

        if (!message) return;
        message.channel.send(resume(member).content);
    },
} as Command;
