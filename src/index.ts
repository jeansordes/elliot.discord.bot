import { config } from "dotenv";
config();

import { Client, Message } from "discord.js";
import { cmdActions, otherActions, helpAction } from "./actions/action.register";

// Global variable
let global: any = {};
global.isBusy = false;
global.flippedTables = 0;

const bot: Client = new Client();

bot.once("ready", () => {
    global.bot = bot;
    console.log("Bot is ready!");
});

bot.on("message", async (message: Message) => {
    if (message.author.id != bot.user.id) {
        if (message.content.startsWith('' + process.env.PREFIX)) {
            [...cmdActions, helpAction].find(a => message.content.startsWith(process.env.PREFIX + a.name))?.fn(message, global);
        } else {
            otherActions.forEach(a => { a.fn(message, global) });
        }
    }
});

bot.login(process.env.TOKEN);
