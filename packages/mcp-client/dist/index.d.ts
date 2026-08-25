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
export declare class MCPClient {
    private ws;
    private config;
    private pendingRequests;
    private messageHandlers;
    private reconnectAttempts;
    private reconnectTimeout;
    private requestId;
    private connected;
    constructor(config: MCPClientConfig);
    connect(): Promise<void>;
    private handleMessage;
    private scheduleReconnect;
    private send;
    onMessage(handler: MessageHandler): () => void;
    listTools(): Promise<Tool[]>;
    callTool(name: string, args: Record<string, unknown>): Promise<ToolResult>;
    disconnect(): void;
    isConnected(): boolean;
}
export declare function useMCPClient(url: string): {
    connected: boolean;
    tools: Tool[];
    error: string | null;
    callTool: (name: string, args: Record<string, unknown>) => Promise<ToolResult>;
    refreshTools: () => Promise<void>;
};
export {};
//# sourceMappingURL=index.d.ts.map