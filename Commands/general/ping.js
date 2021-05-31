"use strict";
import Command from '../../Schema/Command.js';
export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'delay',
            aliases: ['ping'],
            usage: 'ping command',
            enabled: true,
            nsfw: false,
            developersOnly: false,
            cooldown: 3000
        });
    };
    async execute(message, args) {
        const ping = this.client.ws.ping;

        message.channel.send(`Pong! ${ping}`);
    };
};