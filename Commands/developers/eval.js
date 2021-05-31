"use strict";
import Command from '../../Schema/Command.js';
export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: [],
            usage: 'eval command',
            enabled: true,
            nsfw: false,
            developersOnly: true,
            cooldown: 1000
        });
    };
    async execute(message, args) {
           try {
            const code = args.join(" ");
            let evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
      
            message.channel.send(evaled, {code:"js", split: "/n"});
          } catch (err) {
              console.error(err)
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
          }

    };
};