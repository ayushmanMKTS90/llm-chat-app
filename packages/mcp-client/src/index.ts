export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  server?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

export interface MCPClientConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

type MessageHandler = (message: any) => void;

export class MCPClient {
  private ws: WebSocket | null = null;
  private config: MCPClientConfig;
  private pendingRequests = new Map<string, (result: any) => void>();
  private messageHandlers = new Set<MessageHandler>();
  private reconnectAttempts = 0;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private requestId = 0;
  private connected = false;

  constructor(config: MCPClientConfig) {
    this.config = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      ...config,
    };
  }

  connect(): Promise<void> {
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
          } catch (error) {
            console.error('[MCP Client] Failed to parse message:', error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(message: any) {
    const { type, id, ...payload } = message;

    // Handle responses to requests
    if (id && this.pendingRequests.has(id)) {
      const resolver = this.pendingRequests.get(id)!;
      this.pendingRequests.delete(id);
      if (payload.error) {
        resolver(Promise.reject(new Error(payload.error)));
      } else {
        resolver(payload);
      }
      return;
    }

    // Notify handlers
    for (const handler of this.messageHandlers) {
      try {
        handler(message);
      } catch (error) {
        console.error('[MCP Client] Handler error:', error);
      }
    }
  }

  private scheduleReconnect() {
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

  private send<T>(type: string, payload: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('Not connected to MCP bridge'));
        return;
      }

      const id = `${++this.requestId}-${Date.now()}`;
      this.pendingRequests.set(id, (result) => {
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result as T);
        }
      });

      this.ws!.send(JSON.stringify({ type, id, ...payload }));
    });
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  async listTools(): Promise<Tool[]> {
    const response = await this.send<{ tools: Tool[] }>('list_tools', {});
    return response.tools;
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
    const response = await this.send<ToolResult>('call_tool', { name, args });
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

  isConnected(): boolean {
    return this.connected && this.ws?.readyState === WebSocket.OPEN;
  }
}

// React hook for using MCP client
import { useEffect, useRef, useState, useCallback } from 'react';

export function useMCPClient(url: string) {
  const clientRef = useRef<MCPClient | null>(null);
  const [connected, setConnected] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const callTool = useCallback(async (name: string, args: Record<string, unknown>) => {
    if (!clientRef.current) throw new Error('MCP client not initialized');
    return clientRef.current.callTool(name, args);
  }, []);

  const refreshTools = useCallback(async () => {
    if (!clientRef.current) return;
    try {
      const toolList = await clientRef.current.listTools();
      setTools(toolList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to list tools');
    }
  }, []);

  return { connected, tools, error, callTool, refreshTools };
}