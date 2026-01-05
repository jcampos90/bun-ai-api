import OpenAI from "openai";
import type { IAiService } from "../interfaces/IAiService";
import type { IChatMessage } from "../interfaces/IChatMessage";

const openai = new OpenAI(
    {
        apiKey: process.env.DASHSCOPE_API_KEY,
        baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
        timeout: 60000,
    }
);

export const qwen3Service: IAiService = {
    name: "qwen3",
    async chat(messages: IChatMessage[]) {

        const completion = await openai.chat.completions.create({
            model: "qwen3-omni-flash",
            messages,
            stream: true,
            stream_options: {
                include_usage: true
            },
            modalities: ["text", "audio"],
            audio: { voice: "Cherry", format: "wav" }
        });

        return (async function* () {
            for await (const chunk of completion) {
                yield chunk.choices[0]?.delta?.content || '';
            }
        })();

    }

}