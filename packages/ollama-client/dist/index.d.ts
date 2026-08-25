export type Provider = 'ollama' | 'openai' | 'anthropic' | 'openrouter';
export interface Model {
    id: string;
    name: string;
    provider: Provider;
    contextWindow: number;
    supportsVision: boolean;
    supportsTools: boolean;
}
export interface Message {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    toolCalls?: ToolCall[];
    toolCallId?: string;
}
export interface ToolCall {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
}
export interface ChatOptions {
    temperature?: number;
    topP?: number;
    maxTokens?: number;
    stop?: string[];
}
export interface StreamChunk {
    content?: string;
    toolCalls?: ToolCall[];
    done: boolean;
}
export declare class LLMClient {
    private ollama;
    private defaultProvider;
    private defaultModel;
    constructor(ollamaHost?: string);
    setDefaultProvider(provider: Provider): void;
    setDefaultModel(model: string): void;
    listModels(provider?: Provider): Promise<Model[]>;
    pullModel(name: string): Promise<void>;
    chatStream(params: {
        provider: Provider;
        model: string;
        messages: Message[];
        options?: ChatOptions;
        tools?: any[];
        apiKey?: string;
        baseURL?: string;
    }): AsyncGenerator<StreamChunk>;
    private ollamaChatStream;
    private openaiChatStream;
    private anthropicChatStream;
    private openrouterChatStream;
}
export declare function getDefaultModels(): Model[];
export declare function getModelById(id: string): Model | undefined;
//# sourceMappingURL=index.d.ts.map