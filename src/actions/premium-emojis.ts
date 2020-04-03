import Action from "./action.class";
import { Message } from "discord.js";

export default class PremiumEmojis extends Action {
    constructor() {
        const name = ":emoji animé:",
            about = "\"Le saviez vous ?\" : les bots ont des privilèges Nitro, du coup, si vous n'êtes pas Nitro et que vous tentez de poster un emoji animé, Elliot repostera l'emoji animé pour vous :)";

        const fn = (message: Message) => {
            if (/^\:.*\:$/.test(message.content)) { // send nitro emoji
                let emoji_name = message.content.split(":")[1];
                let e = message.guild.emojis
                    .find(_e => _e.name == emoji_name);
                if (e) message.channel.send(e.toString());
            }
        }
        super(name, about, fn);
    }
}