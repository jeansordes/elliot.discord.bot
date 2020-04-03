import MentionElliot from "./mention-elliot";
import PremiumEmojis from "./premium-emojis";
import UnflipTables from "./unflip-tables";
import { Doubt, Perfection, Wtf, Emojis, Megaflip, Help } from "./cmds";
import Action from "./action.class";

const _help = new Help();
export const helpAction = _help;
export const cmdActions: Action[] = [
    new Emojis(),
    new Megaflip(),
    new Doubt(),
    new Perfection(),
    new Wtf(),
];

const _unflipTables = new UnflipTables();
export const unflipTablesAction = _unflipTables;
export const otherActions: Action[] = [
    _unflipTables,
    new PremiumEmojis(),
    new MentionElliot(),
];