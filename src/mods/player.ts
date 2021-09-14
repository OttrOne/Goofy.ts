import { Player, QueryType, Queue, Track } from 'discord-player';
import { Client, GuildMember, TextChannel, TextBasedChannels } from 'discord.js';
import logger from '../core/logger';

let player: Player;

export interface IResponse {

    success: boolean,
    content: string,
}

const getQueue = (member: GuildMember) : IResponse | Queue => {
    if (!player) return { success: false, content: 'Player not started yet.' };
    if (!member.voice.channel) return { success: false, content: 'You have to be in a voice channel.' };

    const queue = player.getQueue(member.guild.id);
    if (!queue || !queue.playing) return { success: false, content: 'There are no songs in the queue.' };

    return queue;
};

export const play = async (query: string, member: GuildMember, channel: TextBasedChannels) : Promise<IResponse> => {

    if (!player) return { success: false, content: 'Player not started yet.' };
    if (!member.voice.channel) return { success: false, content: 'You have to be in a voice channel.' };

    const search = await player.search(query, { requestedBy: member.user, searchEngine: QueryType.AUTO });
    if (!search || search.tracks.length === 0) return { success: false, content: 'Song or playlist not found.' };

    const queue = await player.createQueue(member.guild, { metadata: channel });
    // verify vc connection
    try {
        if (!queue.connection) await queue.connect(member.voice.channel);
    }
    catch {
        queue.destroy();
        return { success: false, content: 'Could not join your voice channel!' };
    }
    search.playlist ? queue.addTracks(search.tracks) : queue.addTrack(search.tracks[0]);
    // queue.setBitrate(192000); caused an Encoding CTL error
    if (!queue.playing) await queue.play();

    return { success: true, content: 'Loaded the requested song(s)' };
};

export const skip = (member: GuildMember) : IResponse => {
    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };

    return queue.skip() ? { success: true, content: `Skipped the song ${queue.current}.` } : { success: false, content: 'Was not able to skip the song.' };
};

export const shuffle = (member: GuildMember) : IResponse => {

    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };

    return queue.shuffle() ? { success: true, content: 'Shuffled playlist.' } : { success: false, content: 'Was not able to shuffle.' };
};

export const stop = (member: GuildMember) : IResponse => {

    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };
    queue.destroy();
    return { success: true, content: 'Emptied playlist.' };
};

export const pause = (member: GuildMember): IResponse => {

    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };
    return queue.setPaused(true) ? { success: true, content: 'Paused playlist.' } : { success: false, content: 'Was not able to pause.' };
};

export const resume = (member: GuildMember): IResponse => {

    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };
    return queue.setPaused(false) ? { success: true, content: 'Resumed playlist.' } : { success: false, content: 'Was not able to resume.' };
};

export const songlist = (member: GuildMember): IResponse => {
    const queue = getQueue(member);
    if (!(queue instanceof Queue)) return { success: queue.success, content: queue.content };

    let response = '';
    for (const track of queue.tracks) {
        response += `\u2022 **${track.title}** by ${track.author}\n`;
    }
    return { success: true, content: response };
};

export default async (client: Client) => {

    player = new Player(client);

    player.on('error', (queue: Queue, error) => {
        logger.error(`[Player] [${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.on('connectionError', (queue: Queue, error) => {
        logger.error(`[Player] [${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on('trackStart', (queue: Queue, track) => {
        if (!(queue.metadata instanceof TextChannel)) return;
        queue.metadata.send(`Started playing **${track.title}** in **${queue.connection.channel.name}**.`);
    });

    player.on('trackAdd', (queue: Queue, track) => {
        if (!(queue.metadata instanceof TextChannel)) return;
        queue.metadata.send(`Added track **${track.title}** to the queue.`);
    });

    player.on('botDisconnect', (queue: Queue) => {
        if (!(queue.metadata instanceof TextChannel)) return;
        queue.metadata.send('EEEEEE good bye.');
    });

    player.on('channelEmpty', queue => {
        if (!(queue.metadata instanceof TextChannel)) return;
        queue.metadata.send('EEEEEE good bye.');
    });

    player.on('queueEnd', queue => {
        if (!(queue.metadata instanceof TextChannel)) return;
        queue.metadata.send('Playlist finished.');
    });
};
