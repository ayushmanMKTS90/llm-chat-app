import { WebSocketServer, WebSocket } from 'ws';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class MCPBridge {
    wss;
    clients = new Map();
    transports = new Map();
    pendingRequests = new Map();
    config;
    requestId = 0;
    constructor(config, port = 3001) {
        this.config = config;
        this.wss = new WebSocketServer({ port });
        this.setupServer();
    }
    setupServer() {
        this.wss.on('connection', (ws) => {
            console.log('[MCP Bridge] Client connected');
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data.toString());
                    this.handleMessage(ws, message);
                }
                catch (error) {
                    console.error('[MCP Bridge] Failed to parse message:', error);
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
                }
            });
            ws.on('close', () => {
                console.log('[MCP Bridge] Client disconnected');
            });
            ws.on('error', (error) => {
                console.error('[MCP Bridge] WebSocket error:', error);
            });
        });
        this.wss.on('listening', () => {
            console.log(`[MCP Bridge] WebSocket server listening on port ${this.wss.options.port}`);
        });
        this.wss.on('error', (error) => {
            console.error('[MCP Bridge] Server error:', error);
        });
    }
    async handleMessage(ws, message) {
        const { type, id, ...payload } = message;
        switch (type) {
            case 'connect': {
                await this.connectAllServers();
                this.send(ws, { type: 'connected', servers: Array.from(this.clients.keys()) });
                break;
            }
            case 'list_tools': {
                const allTools = [];
                for (const [serverName, client] of this.clients) {
                    try {
                        const result = await client.listTools();
                        const tools = result.tools.map((tool) => ({
                            ...tool,
                            server: serverName,
                        }));
                        allTools.push(...tools);
                    }
                    catch (error) {
                        console.error(`[MCP Bridge] Failed to list tools for ${serverName}:`, error);
                    }
                }
                this.send(ws, { type: 'tools_list', tools: allTools, id });
                break;
            }
            case 'call_tool': {
                const { name, args } = payload;
                const serverName = await this.findServerForTool(name);
                if (!serverName) {
                    this.send(ws, {
                        type: 'tool_result',
                        id,
                        error: `Tool ${name} not found on any server`
                    });
                    return;
                }
                const client = this.clients.get(serverName);
                if (!client) {
                    this.send(ws, {
                        type: 'tool_result',
                        id,
                        error: `Server ${serverName} not connected`
                    });
                    return;
                }
                try {
                    const result = await client.callTool({ name, arguments: args });
                    this.send(ws, { type: 'tool_result', id, result: result.content });
                }
                catch (error) {
                    this.send(ws, {
                        type: 'tool_result',
                        id,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
                break;
            }
            case 'disconnect': {
                await this.disconnectAll();
                this.send(ws, { type: 'disconnected' });
                break;
            }
            default:
                this.send(ws, { type: 'error', message: `Unknown message type: ${type}` });
        }
    }
    async findServerForTool(toolName) {
        for (const [serverName, client] of this.clients) {
            try {
                const result = await client.listTools();
                if (result.tools.some((t) => t.name === toolName)) {
                    return serverName;
                }
            }
            catch {
                // Server might not be ready
            }
        }
        return null;
    }
    async connectAllServers() {
        for (const [name, serverConfig] of Object.entries(this.config.mcpServers)) {
            if (this.clients.has(name))
                continue;
            try {
                console.log(`[MCP Bridge] Connecting to ${name}...`);
                const env = { ...process.env };
                if (serverConfig.env) {
                    for (const [key, value] of Object.entries(serverConfig.env)) {
                        if (value !== undefined) {
                            env[key] = value;
                        }
                    }
                }
                const transport = new StdioClientTransport({
                    command: serverConfig.command,
                    args: serverConfig.args,
                    env,
                });
                const client = new Client({ name: `mcp-bridge-${name}`, version: '1.0.0' }, { capabilities: {} });
                await client.connect(transport);
                this.clients.set(name, client);
                this.transports.set(name, transport);
                console.log(`[MCP Bridge] Connected to ${name}`);
            }
            catch (error) {
                console.error(`[MCP Bridge] Failed to connect to ${name}:`, error);
            }
        }
    }
    async disconnectAll() {
        for (const [name, client] of this.clients) {
            try {
                await client.close();
                console.log(`[MCP Bridge] Disconnected from ${name}`);
            }
            catch (error) {
                console.error(`[MCP Bridge] Error disconnecting from ${name}:`, error);
            }
        }
        this.clients.clear();
        this.transports.clear();
    }
    send(ws, message) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    }
    async shutdown() {
        await this.disconnectAll();
        this.wss.close();
    }
}
function loadConfig(configPath) {
    try {
        const content = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(content);
    }
    catch (error) {
        console.error(`[MCP Bridge] Failed to load config from ${configPath}:`, error);
        return { mcpServers: {} };
    }
}
const configPath = process.env.MCP_CONFIG_PATH
    ? path.resolve(process.cwd(), process.env.MCP_CONFIG_PATH)
    : path.resolve(__dirname, '../../mcp.config.json');
const config = loadConfig(configPath);
const port = parseInt(process.env.PORT || '3001', 10);
const bridge = new MCPBridge(config, port);
process.on('SIGINT', async () => {
    console.log('[MCP Bridge] Shutting down...');
    await bridge.shutdown();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('[MCP Bridge] Shutting down...');
    await bridge.shutdown();
    process.exit(0);
});
