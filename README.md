# AI API Gateway (Bun + TypeScript)

A lightweight, **open source** AI API gateway built with **Bun** and **TypeScript**. It provides a single endpoint to access multiple AI providers with built-in streaming support and security.

## 🚀 Features

- **Multi-Provider Support**: Round-robin load balancing between:
  - **Gemini 2.0** (with Thinking & Google Search)
  - **Qwen3** (Omni-Flash via DashScope)
  - **Cerebras Cloud** (High-speed inference)
  - **Groq** (LPU-accelerated inference)
  - **OpenRouter** (Unified LLM access)
- **Streaming Responses**: Real-time `text/event-stream` support for all services.
- **Docker Ready**: Production-optimized `Dockerfile` and `docker-compose.yml`.
- **Nixpacks Support**: Zero-config deployment for platforms like Railway.
- **Security**: Simple API Key authentication.
- **Performance**: Powered by Bun for minimal overhead and fast execution.

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) installed locally.
- API Keys for the respective services (see Environment Variables).

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
API_KEY=your_secure_api_key_for_clients

# Service Keys
GEMINI_API_KEY=...
DASHSCOPE_API_KEY=...
CEREBRAS_API_KEY=...
GROQ_API_KEY=...
OPEN_ROUTER_API_KEY=...
```

## 📦 Installation & Setup

### Local Development

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run in development mode:
   ```bash
   bun run dev
   ```

### Docker Deployment

Deploy with a single command:
```bash
docker-compose up --build -d
```

## 📡 API Usage

### `POST /chat`

Send a chat request to the gateway. The service uses a round-robin strategy to distribute requests among enabled providers.

**Headers:**
- `Content-Type: application/json`
- `X-API-KEY: <your_api_key>`

**Request Body:**
```json
{
    "messages": [
        {
            "role": "user",
            "content": "Hello, how does AI work?"
        }
    ]
}
```

**Response:**
Returns a `text/event-stream` of the model's response.

## 🧪 Testing

You can use the included `test.http` file with the REST Client extension in VS Code.

1. Configure your environment variables in `settings.json` (as shown in the project setup).
2. Open `test.http`.
3. Click "Send Request".

## 🏗️ Project Structure

- `index.ts`: The main server and routing logic.
- `services/`: Implementation of different AI providers.
- `interfaces/`: TypeScript definitions for standardizing services.
- `Dockerfile` / `docker-compose.yml`: Containerization logic.
- `nixpacks.toml`: Deployment configuration.

## 📄 License

MIT
