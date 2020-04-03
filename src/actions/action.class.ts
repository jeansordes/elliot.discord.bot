import { Message } from "discord.js";

export default abstract class Action {
    constructor(
        public name: string,
        public about: string,
        public fn: (message: Message, global?: any) => void,
    ) { }
}