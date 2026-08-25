"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMClient = void 0;
exports.getDefaultModels = getDefaultModels;
exports.getModelById = getModelById;
const ollama_1 = require("ollama");
const DEFAULT_MODELS = [
    { id: 'llama3.1:8b', name: 'Llama 3.1 8B', provider: 'ollama', contextWindow: 128000, supportsVision: false, supportsTools: true },
    { id: 'qwen2.5:7b', name: 'Qwen 2.5 7B', provider: 'ollama', contextWindow: 32768, supportsVision: false, supportsTools: true },
    { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'openai', contextWindow: 128000, supportsVision: true, supportsTools: true },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', contextWindow: 128000, supportsVision: true, supportsTools: true },
    { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', provider: 'anthropic', contextWindow: 200000, supportsVision: true, supportsTools: true },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', contextWindow: 200000, supportsVision: true, supportsTools: true },
    { id: 'openrouter/auto', name: 'OpenRouter Auto', provider: 'openrouter', contextWindow: 128000, supportsVision: true, supportsTools: true },
];
class LLMClient {
    ollama;
    defaultProvider = 'ollama';
    defaultModel = 'llama3.1:8b';
    constructor(ollamaHost = 'http://localhost:11434') {
        this.ollama = new ollama_1.Ollama({ host: ollamaHost });
    }
    setDefaultProvider(provider) {
        this.defaultProvider = provider;
    }
    setDefaultModel(model) {
        this.defaultModel = model;
    }
    async listModels(provider) {
        if (provider === 'ollama' || !provider) {
            try {
                const { models } = await this.ollama.list();
                return models.map((m) => ({
                    id: m.name,
                    name: m.name,
                    provider: 'ollama',
                    contextWindow: 128000,
                    supportsVision: false,
                    supportsTools: true,
                }));
            }
            catch {
                return DEFAULT_MODELS.filter((m) => m.provider === 'ollama');
            }
        }
        return DEFAULT_MODELS.filter((m) => m.provider === (provider || this.defaultProvider));
    }
    async pullModel(name) {
        await this.ollama.pull({ model: name, stream: true });
    }
    async *chatStream(params) {
        const { provider, model, messages, options, tools, apiKey, baseURL } = params;
        switch (provider) {
            case 'ollama':
                yield* this.ollamaChatStream(model, messages, options, tools);
                break;
            case 'openai':
                yield* this.openaiChatStream(model, messages, options, tools, apiKey, baseURL);
                break;
            case 'anthropic':
                yield* this.anthropicChatStream(model, messages, options, tools, apiKey, baseURL);
                break;
            case 'openrouter':
                yield* this.openrouterChatStream(model, messages, options, tools, apiKey, baseURL);
                break;
        }
    }
    async *ollamaChatStream(model, messages, options, tools) {
        // Convert our message format to ollama's expected format
        const ollamaMessages = messages.map((m) => {
            const base = {
                role: m.role,
                content: m.content,
            };
            if (m.toolCalls && m.toolCalls.length > 0) {
                return {
                    ...base,
                    tool_calls: m.toolCalls.map((tc) => ({
                        id: tc.id,
                        type: 'function',
                        function: {
                            name: tc.name,
                            arguments: JSON.stringify(tc.arguments),
                        },
                    })),
                };
            }
            if (m.toolCallId) {
                return {
                    ...base,
                    tool_call_id: m.toolCallId,
                };
            }
            return base;
        });
        const stream = await this.ollama.chat({
            model,
            messages: ollamaMessages,
            options: {
                temperature: options?.temperature ?? 0.7,
                top_p: options?.topP ?? 0.9,
                num_predict: options?.maxTokens ?? 4096,
                stop: options?.stop,
            },
            tools,
            stream: true,
        });
        for await (const chunk of stream) {
            if (chunk.message?.content) {
                yield { content: chunk.message.content, done: false };
            }
            if (chunk.message?.tool_calls) {
                yield {
                    toolCalls: chunk.message.tool_calls.map((tc) => ({
                        id: tc.id,
                        name: tc.function.name,
                        arguments: JSON.parse(tc.function.arguments),
                    })),
                    done: false,
                };
            }
            if (chunk.done) {
                yield { done: true };
            }
        }
    }
    async *openaiChatStream(model, messages, options, tools, apiKey, baseURL) {
        const url = `${baseURL || 'https://api.openai.com/v1'}/chat/completions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model,
                messages: messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                    tool_calls: m.toolCalls,
                    tool_call_id: m.toolCallId,
                })),
                temperature: options?.temperature ?? 0.7,
                top_p: options?.topP ?? 0.9,
                max_tokens: options?.maxTokens ?? 4096,
                stop: options?.stop,
                tools,
                stream: true,
            }),
        });
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            return;
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        yield { done: true };
                        return;
                    }
                    try {
                        const parsed = JSON.parse(data);
                        const choice = parsed.choices[0];
                        if (choice.delta?.content) {
                            yield { content: choice.delta.content, done: false };
                        }
                        if (choice.delta?.tool_calls) {
                            yield {
                                toolCalls: choice.delta.tool_calls.map((tc) => ({
                                    id: tc.id,
                                    name: tc.function.name,
                                    arguments: JSON.parse(tc.function.arguments),
                                })),
                                done: false,
                            };
                        }
                    }
                    catch {
                        // Ignore parse errors
                    }
                }
            }
        }
    }
    async *anthropicChatStream(model, messages, options, tools, apiKey, baseURL) {
        const url = `${baseURL || 'https://api.anthropic.com/v1'}/messages`;
        const systemMessage = messages.find((m) => m.role === 'system');
        const chatMessages = messages.filter((m) => m.role !== 'system');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey || process.env.ANTHROPIC_API_KEY || '',
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model,
                system: systemMessage?.content,
                messages: chatMessages.map((m) => ({
                    role: m.role === 'tool' ? 'user' : m.role,
                    content: m.role === 'tool'
                        ? [{ type: 'tool_result', tool_use_id: m.toolCallId, content: m.content }]
                        : m.content,
                })),
                temperature: options?.temperature ?? 0.7,
                top_p: options?.topP ?? 0.9,
                max_tokens: options?.maxTokens ?? 4096,
                tools,
                stream: true,
            }),
        });
        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.statusText}`);
        }
        const reader = response.body?.getReader();
        if (!reader)
            return;
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                if (line.startsWith('event: '))
                    continue;
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                            yield { content: parsed.delta.text, done: false };
                        }
                        if (parsed.type === 'message_delta' && parsed.delta?.stop_reason === 'tool_use') {
                            // Handle tool use
                        }
                    }
                    catch {
                        // Ignore parse errors
                    }
                }
            }
        }
    }
    async *openrouterChatStream(model, messages, options, tools, apiKey, baseURL) {
        // OpenRouter uses OpenAI-compatible API
        yield* this.openaiChatStream(model, messages, options, tools, apiKey, baseURL || 'https://openrouter.ai/api/v1');
    }
}
exports.LLMClient = LLMClient;
function getDefaultModels() {
    return DEFAULT_MODELS;
}
function getModelById(id) {
    return DEFAULT_MODELS.find((m) => m.id === id);
}
