import Action from "./action.class";
import { Message } from "discord.js";

export default class MentionElliot extends Action {
    constructor() {
        const name = "Rappel moi le préfixe ?",
            about = "Si vous ne vous souvenez plus de mon préfixe, il vous suffit de me mentionner";
        const fn = (message: Message, global: any) => {
            if (message.isMemberMentioned(global.bot.user)
                && message.mentions.members.first().user == global.bot.user) {
                // if someone mentions Elliot, answer with a help message
                message.reply("Pour avoir la liste de mes commandes  ```" + process.env.PREFIX + "help```");
            }
        };
        super(name, about, fn);
    }
}