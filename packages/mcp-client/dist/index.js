"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPClient = void 0;
exports.useMCPClient = useMCPClient;
class MCPClient {
    ws = null;
    config;
    pendingRequests = new Map();
    messageHandlers = new Set();
    reconnectAttempts = 0;
    reconnectTimeout = null;
    requestId = 0;
    connected = false;
    constructor(config) {
        this.config = {
            reconnectInterval: 5000,
            maxReconnectAttempts: 10,
            ...config,
        };
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                resolve();
                return;
            }
            try {
                this.ws = new WebSocket(this.config.url);
                this.ws.onopen = () => {
                    console.log('[MCP Client] Connected to bridge');
                    this.connected = true;
                    this.reconnectAttempts = 0;
                    resolve();
                };
                this.ws.onclose = () => {
                    console.log('[MCP Client] Disconnected from bridge');
                    this.connected = false;
                    this.scheduleReconnect();
                };
                this.ws.onerror = (error) => {
                    console.error('[MCP Client] WebSocket error:', error);
                    if (!this.connected) {
                        reject(error);
                    }
                };
                this.ws.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        this.handleMessage(message);
                    }
                    catch (error) {
                        console.error('[MCP Client] Failed to parse message:', error);
                    }
                };
            }
            catch (error) {
                reject(error);
            }
        });
    }
    handleMessage(message) {
        const { type, id, ...payload } = message;
        // Handle responses to requests
        if (id && this.pendingRequests.has(id)) {
            const resolver = this.pendingRequests.get(id);
            this.pendingRequests.delete(id);
            if (payload.error) {
                resolver(Promise.reject(new Error(payload.error)));
            }
            else {
                resolver(payload);
            }
            return;
        }
        // Notify handlers
        for (const handler of this.messageHandlers) {
            try {
                handler(message);
            }
            catch (error) {
                console.error('[MCP Client] Handler error:', error);
            }
        }
    }
    scheduleReconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
        if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 10)) {
            console.error('[MCP Client] Max reconnect attempts reached');
            return;
        }
        this.reconnectAttempts++;
        const delay = this.config.reconnectInterval || 5000;
        console.log(`[MCP Client] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
        this.reconnectTimeout = setTimeout(() => {
            this.connect().catch((error) => {
                console.error('[MCP Client] Reconnect failed:', error);
            });
        }, delay);
    }
    send(type, payload) {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                reject(new Error('Not connected to MCP bridge'));
                return;
            }
            const id = `${++this.requestId}-${Date.now()}`;
            this.pendingRequests.set(id, (result) => {
                if (result instanceof Error) {
                    reject(result);
                }
                else {
                    resolve(result);
                }
            });
            this.ws.send(JSON.stringify({ type, id, ...payload }));
        });
    }
    onMessage(handler) {
        this.messageHandlers.add(handler);
        return () => this.messageHandlers.delete(handler);
    }
    async listTools() {
        const response = await this.send('list_tools', {});
        return response.tools;
    }
    async callTool(name, args) {
        const response = await this.send('call_tool', { name, args });
        return response;
    }
    disconnect() {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.connected = false;
    }
    isConnected() {
        return this.connected && this.ws?.readyState === WebSocket.OPEN;
    }
}
exports.MCPClient = MCPClient;
// React hook for using MCP client
const react_1 = require("react");
function useMCPClient(url) {
    const clientRef = (0, react_1.useRef)(null);
    const [connected, setConnected] = (0, react_1.useState)(false);
    const [tools, setTools] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const client = new MCPClient({ url });
        clientRef.current = client;
        const unsubscribe = client.onMessage((message) => {
            if (message.type === 'tools_list') {
                setTools(message.tools);
            }
        });
        client.connect()
            .then(() => setConnected(true))
            .catch((err) => setError(err.message));
        return () => {
            unsubscribe();
            client.disconnect();
        };
    }, [url]);
    const callTool = (0, react_1.useCallback)(async (name, args) => {
        if (!clientRef.current)
            throw new Error('MCP client not initialized');
        return clientRef.current.callTool(name, args);
    }, []);
    const refreshTools = (0, react_1.useCallback)(async () => {
        if (!clientRef.current)
            return;
        try {
            const toolList = await clientRef.current.listTools();
            setTools(toolList);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to list tools');
        }
    }, []);
    return { connected, tools, error, callTool, refreshTools };
}
