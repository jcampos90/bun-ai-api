import { OpenRouter } from "@openrouter/sdk";
import type { IAiService } from '../interfaces/IAiService';
import type { IChatMessage } from '../interfaces/IChatMessage';

const openrouter = new OpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const openRouterService: IAiService = {
    name: 'openrouter',
    chat: async (messages: IChatMessage[]) => {
        const stream = await openrouter.chat.send({
            model: "qwen/qwen3-235b-a22b-2507",
            messages: messages as any,
            stream: true,
            streamOptions: {
                includeUsage: true
            },
        });



        return (async function* () {
            for await (const chunk of stream) {
                yield chunk.choices[0]?.delta?.content || '';
            }
        })();


    }
}