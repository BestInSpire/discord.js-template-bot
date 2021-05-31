"use strict";
import humanizeDuration from 'humanize-duration';
let commandCooldown = {};

export default class {
    constructor(client) {
        this.client = client
    };
    async execute(message) {
        const args = message.content.split(" ").slice(1);
        if (message.content.startsWith(this.client.config.prefix)) {

            let commandName = message.content.split(" ")[0].slice(this.client.config.prefix.length);

            if (message.content.startsWith(this.client.config.prefix)) {
            let command = this.client.commands.get(commandName) || this.client.commands.find(({help: {aliases}}) => aliases.includes(commandName));
            if(command) {
                if(!command.conf.enabled) return message.channel.send('This command is currently disabled!');
                if(command.conf.developersOnly && !this.client.config.developers.includes(message.author.id)) return message.channel.send('This command is for developers.');
                if(command.conf.nsfw && !message.channel.nsfw) return message.channel.send('This command cannot be used outside of the nsfw channel!');

                let userCooldown = commandCooldown[message.author.id];
                if(!userCooldown){
                    commandCooldown[message.author.id] = {};
                    commandCooldown[message.author.id][command.help.name] = Date.now() + command.conf.cooldown;
                } else {
                    const time = userCooldown[command.help.name] || 0;
                    if(time && (time > Date.now())){
                        return message.reply("you have to wait {time} to use this command again".replace('{time}', humanizeDuration(time-Date.now(), {round: true})));
                    };
                };

                try {
                    command.execute(message, args);
                } catch (err) {
                    console.log(err);
                    };
                };

            };
        };
    };
};