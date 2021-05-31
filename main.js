"use strict"
import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import config from './config.js';

class Load extends Client {
    constructor() {
        super();
        this.commands = new Collection();
        this.config = config;
    }

    async execute() {
        const directories = readdirSync(process.cwd() + '/Commands/');
        directories.forEach(async (dir) => {
            const commands = readdirSync(process.cwd() + "/Commands/"+dir+"/");
            commands.filter((cmd) => cmd.split(".").pop() === "js").forEach(async (cmd) => {
                const Load = await import(`./Commands/${dir}/${cmd}`)
                const Command =await new Load.default(this)
                this.commands.set(Command.help.name, Command);
            });
        });
        const evtFiles = readdirSync(process.cwd() + "/Events/");
        evtFiles.forEach(async (file) => {
            const eventName = file.split(".")[0];
            const event = new (await import(`./Events/${file}`)).default(this);
            this.on(eventName, (...args) => event.execute(...args));
        });

        await this.login(config.token)
    }
}
new Load().execute()