import { Message } from "discord.js";
import Action from "./action.class";

const delayEdit = (msg: Message, output: string, timeOut: number) => {
    setTimeout(() => { msg.edit(output) }, timeOut);
};

export default class UnflipTables extends Action {
    constructor() {
        const name = "┬─┬ ノ( ゜-゜ノ)",
            about = "Elliot se charge de remettre les tables automatiquement en place quand vous retournez des tables\n\nRemarques : Si Elliot est déjà en train de remettre des tables quand vous flippez des tables, il met le nombre de tables à remettre en place dans son buffer et s'en chargera quand il aura terminé avec les tables d'avant\n\nNombre de tables retournables avant qu'Elliot ne vous dise que c'est trop pour lui : " + process.env.MAX_TABLE_FLIP;

        let countFlipTable = (str: string) => {
            let re = /┻━*┻/g
            return (re.test(str)) ? ((str || '').match(re) || []).length : 0;
        }

        const unflipTables = (message: Message, global: any) => {
            let flipCount = countFlipTable(message.content) + <number>global.flippedTables;
            if (flipCount > 0) {
                if (!global.isBusy) {
                    global.flippedTables = 0;
                    global.isBusy = true;
                    let getTables = (flipped: number, unflipped: number) => {
                        if (flipped === -1) {
                            return "┬─┬ ".repeat(unflipped) + " ( ^ - ^ )";
                        } else if (unflipped === 0) {
                            return "┻┻ ".repeat(flipped) + " (° -°   )";
                        } else {
                            return "┬─┬ ".repeat(unflipped) + "ノ(° -° ノ)" + "┻┻ ".repeat(flipped);
                        }
                    };
                    if (flipCount < Number(process.env.MAX_TABLE_FLIP)) {
                        message.channel.send(getTables(flipCount, 0)).then((msg) => {
                            let i = 1;
                            for (; i <= flipCount; i++) {
                                delayEdit(msg, getTables(flipCount - i, i), i * 1000);
                            }
                            delayEdit(msg, getTables(-1, i - 1), i * 1000);
                            setTimeout(() => {
                                global.isBusy = false;
                                unflipTables(msg, global);
                            }, (i * 1000) + 500);
                        })
                            .catch(err => {
                                message.channel.send("<@248793731359047680> J'ai une erreur :/ ```" + err + "```")
                                    .catch(console.log);
                            });;
                    } else {
                        let initialMsg = "Tables à remettre : " + flipCount + " ﾍ(￣ ￣'ﾍ)";
                        message.channel.send(initialMsg).then((msg) => {
                            delayEdit(msg, initialMsg + "\n╭( ￣ ￣')╮", 3000);
                            delayEdit(msg, initialMsg + "\n╭( ￣ ￣')╮\nHmmm ...", 4000);
                            delayEdit(msg, initialMsg + "\n╭( ￣ ￣')╮\nHmmm ...\nNope", 6000);
                            setTimeout(() => {
                                global.isBusy = false;
                                unflipTables(msg, global);
                            }, 6500);
                        })
                            .catch(err => {
                                message.channel.send("<@248793731359047680> J'ai une erreur :/ ```" + err + "```")
                                    .catch(console.log);
                            });;
                    }
                } else {
                    global.flippedTables += countFlipTable(message.content);
                }
            }
        }

        super(name, about, unflipTables);
    }
}