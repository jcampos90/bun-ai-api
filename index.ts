const server = Bun.serve({
    port: process.env.PORT ?? 3000,
    async fetch(req) {
        return new Response("AI API is running!");
    },
});

console.log(`Server running at http://localhost:${server.port}`);