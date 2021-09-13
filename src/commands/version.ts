import { Command, CommandType } from '../interfaces/command';
import { CallbackOptions } from '../interfaces/CallbackOptions';
import { VERSION } from '../version';

const generateReplyText = (numGuilds: number) => {
    return `DJ Goofy version \`${VERSION}\` by AlexOttr#3000. uwu.`;
};

export = {
    name: 'version',
    type: CommandType.BOTH,
    category: 'LexBot',
    description: 'Version of the bot.',
    maxArgs: 0,
    run: async ({ message, interaction }: CallbackOptions) => {

        if (message) {
            const numGuilds = message.client.guilds.cache.size;
            message.reply(generateReplyText(numGuilds));

        }
        // slash command
        else if (interaction) {
            if (!interaction.channel) return;
            const numGuilds = interaction.channel.client.guilds.cache.size;
            interaction.reply(generateReplyText(numGuilds));
        }
    },
} as Command;
