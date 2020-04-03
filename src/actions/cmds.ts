import Action from "./action.class";
import { Message } from "discord.js";
import { cmdActions, otherActions } from "./action.register";
import { unflipTablesAction } from "./action.register";

// Help command
export class Help extends Action {
    constructor() {
        const thisName = "help",
            thisAbout = "Affiche les actions que réalisent Elliot",
            fn = (message: Message) => {
                [{ name: "Commandes", list: [...cmdActions, { name: thisName, about: thisAbout }], withPrefix: true, color: 16312092 },
                { name: "Autres comportements", list: otherActions, withPrefix: false, color: 0x8080ff }].forEach(actionType => {
                    message.channel.send({
                        "embed": {
                            "color": actionType.color,
                            "author": { "name": actionType.name },
                            "fields": (actionType.list).map(a => ({ "name": (actionType.withPrefix ? process.env.PREFIX : '') + a.name, "value": a.about }))
                        }
                    });
                });
            };
        super(thisName, thisAbout, fn);
    }
}

export class Emojis extends Action {
    constructor() {
        const
            name = "emoji",
            about = "Liste tous les emojis du serveur\nUsage: __" + process.env.PREFIX + "emojis [-v | --verbose]__",
            fn = (message: Message) => {
                message.channel.send(message.guild.emojis.map(e => e.toString()).join(" "));
                if (/-v|--verbose/.test(message.content)) {
                    message.channel.send(message.guild.emojis.map(e => "`" + e.toString() + "`").join(" "));
                }
            };

        super(name, about, fn);
    }
}

export class Megaflip extends Action {
    constructor() {
        const name = "megaflip",
            about = "Retourne des tables ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻ avant de les remettre en place",
            fn = (message: Message, global: any) => {
                message.channel.send("┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻").then(msg => {
                    unflipTablesAction.fn(msg, global);
                })
            };
        super(name, about, fn);
    }
}

export class Wtf extends Action {
    constructor() {
        const name = "wtf",
            about = "Poste une peinture de personne qui ne comprend pas ce qu'elle lit",
            fn = (m: Message) => { m.channel.send("https://i.postimg.cc/Bv6q6fVC/ab-Y5exb-460s.png") };
        super(name, about, fn);
    }
}

export class Doubt extends Action {
    constructor() {
        const name = "doubt",
            about = "Poste une image exprimant ... le doute ...",
            fn = (m: Message) => { m.channel.send("https://i.postimg.cc/NfcBXHnF/d63.jpg") };
        super(name, about, fn);
    }
}

export class Perfection extends Action {
    constructor() {
        const name = "perfection",
            about = "Poste une image exprimant la satisfaction d'avoir vu la perfection naturelle des choses (référence à Magneto dans xmen)",
            fn = (m: Message) => { m.channel.send("https://www.tenor.co/HlYd.gif") };
        super(name, about, fn);
    }
}