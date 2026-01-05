import type { IAiService } from "./interfaces/IAiService";
import type { IChatMessage } from "./interfaces/IChatMessage";
import { cerebrasService } from "./services/cerebras";
import { groqService } from "./services/groq";
import { openRouterService } from "./services/openRouter";
import { geminiService } from "./services/gemini3";
import { qwen3Service } from "./services/qwen3";


const services: IAiService[] = [
    // geminiService,
    qwen3Service,
    openRouterService,
    groqService,
    cerebrasService,
];

let currentServiceIndex = 0;

function getNextService() {
    const service = services[currentServiceIndex];
    currentServiceIndex = (currentServiceIndex + 1) % services.length;
    return service;
}

const server = Bun.serve({
    port: process.env.PORT ?? 3000,
    idleTimeout: 60, // Increase timeout to 60 seconds
    async fetch(req) {

        if (req.headers.get('x-api-key') !== process.env.API_KEY) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { pathname } = new URL(req.url);
        if (req.method === 'POST' && pathname === '/chat') {
            const { messages } = await req.json() as { messages: IChatMessage[] };

            const service = getNextService();
            console.log(`Using service: ${service?.name}`);
            const response = await service?.chat(messages);
            return new Response(response, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                }
            });
        }
        return new Response('Not Found', { status: 404 });
    },
});

console.log(`Server running at http://localhost:${server.port}`);