"use strict"
export default class {
    constructor(client,{
        name = null,
	enabled = true,
        description = null,
        usage = null,
	aliases = new Array(),
	nsfw = false,
	developersOnly = false,
	cooldown = 3000

    }) {
        this.client = client;
        this.conf = { enabled, cooldown, nsfw, developersOnly }
        this.help = { name, aliases, description, usage }
    }
}
