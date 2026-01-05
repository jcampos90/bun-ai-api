import type { IChatMessage } from "./IChatMessage";

export interface IAiService {
    name: string;
    chat(messages: IChatMessage[]): Promise<AsyncIterable<string>>;
}