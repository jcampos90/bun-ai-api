import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { IAiService } from '../interfaces/IAiService';
import type { IChatMessage } from '../interfaces/IChatMessage';

const cerebras = new Cerebras({ apiKey: process.env.CEREBRAS_API_KEY });

export const cerebrasService: IAiService = {
    name: 'cerebras',
    chat: async (messages: IChatMessage[]) => {
        const stream = await cerebras.chat.completions.create({
            messages: messages as any,
            model: 'gpt-oss-120b',
            stream: true,
            max_completion_tokens: 32768,
            temperature: 1,
            top_p: 1,
            reasoning_effort: "medium"
        });


        return (async function* () {
            for await (const chunk of stream) {
                yield (chunk as any).choices[0]?.delta?.content || '';
            }
        })();
    }
}