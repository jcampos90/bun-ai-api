import { GoogleGenAI } from '@google/genai';
import type { IAiService } from '../interfaces/IAiService';
import type { IChatMessage } from '../interfaces/IChatMessage';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const geminiService: IAiService = {
    name: 'gemini',
    chat: async (messages: IChatMessage[]) => {
        const tools = [
            {
                googleSearch: {}
            },
        ];

        const config = {
            thinkingConfig: {
                thinkingLevel: 'HIGH',
            },
            tools,
        };

        const model = 'gemini-3-flash-preview';

        // Map messages to Gemini format
        const contents = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        const response = await ai.models.generateContentStream({
            model,
            config: config as any,
            contents: contents as any,
        });

        return (async function* () {
            for await (const chunk of response) {
                yield chunk.text || '';
            }
        })();
    }
}
