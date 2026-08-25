'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { Send, Mic, Paperclip, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  model?: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

interface ToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
  result?: unknown;
}

const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m ready to help. You can chat with me using local models via Ollama or cloud providers like OpenAI and Anthropic. I also have MCP integration for tool calling.',
    timestamp: new Date(Date.now() - 3600000),
    model: 'llama3.1:8b',
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you show me how to use the MCP integration with Trello?',
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'I\'ll help you set up the Trello MCP integration. First, you\'ll need to configure the MCP bridge with your Trello API credentials.',
    timestamp: new Date(Date.now() - 60000),
    model: 'llama3.1:8b',
    toolCalls: [
      {
        id: 'tc-1',
        name: 'trello_list_boards',
        args: {},
        result: [{ id: 'b1', name: 'Project Board' }, { id: 'b2', name: 'Personal' }],
      },
    ],
  },
];

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama3.1:8b');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Simulate streaming response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `This is a simulated response to: "${input}". In the real implementation, this would stream from your selected model (${selectedModel}).`,
        timestamp: new Date(),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Model selector bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-hairline bg-canvas-soft/50">
        <ModelSelector
          value={selectedModel}
          onChange={setSelectedModel}
          disabled={isStreaming}
        />
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-caption-sm text-mute">
          <Sparkles className="h-3 w-3" />
          <span>MCP: Connected (3 servers)</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" role="log" aria-live="polite">
        <MessageList messages={messages} isStreaming={isStreaming} />
        <div ref={messagesEndRef} />
      </div>

      {/* Streaming indicator */}
      {isStreaming && (
        <div className="px-4 py-2 text-center text-caption-sm text-mute animate-pulse">
          Generating response...
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-hairline bg-canvas-soft/50">
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="btn-ghost p-2 h-10"
            aria-label="Attach files"
            disabled={isStreaming}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize(e);
            }}
            onKeyDown={handleKeyDown}
            onClick={(e) => autoResize(e as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
            placeholder={isStreaming ? 'Generating...' : 'Message...'}
            className="textarea-card flex-1 min-h-[44px] max-h-[200px] pr-12"
            disabled={isStreaming}
            rows={1}
            aria-label="Chat input"
          />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-ghost p-2 h-10"
              aria-label="Voice input"
              disabled={isStreaming || !!input}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className={cn(
                'btn-primary h-10 min-w-[44px]',
                !input.trim() && 'opacity-50 pointer-events-none'
              )}
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-caption-sm text-mute text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}