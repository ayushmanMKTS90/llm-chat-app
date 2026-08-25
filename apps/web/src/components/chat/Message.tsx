'use client';

import { useState } from 'react';
import { MessageComponentProps } from './types';
import { Copy, RotateCcw, GitBranch, Check, X, ChevronDown, Terminal, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const roleIcons: Record<MessageComponentProps['message']['role'], string> = {
  user: '👤',
  assistant: '🤖',
  system: '⚙️',
  tool: '🔧',
};

const roleLabels: Record<MessageComponentProps['message']['role'], string> = {
  user: 'You',
  assistant: 'Assistant',
  system: 'System',
  tool: 'Tool',
};

function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const language = (className as string)?.replace(/language-/, '') || 'text';
  const code = String(children).trim();
  
  return (
    <div className="relative group my-2 rounded-lg bg-surface-dark overflow-hidden" {...props}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-hairline bg-canvas-soft">
        <span className="flex items-center gap-1 text-caption-sm text-body font-mono">
          <Terminal className="h-3 w-3" />
          {language}
        </span>
        <div className="flex-1" />
        <button
          className="btn-ghost p-1.5 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>
      <SyntaxHighlighter language={language} style={atomDark} customStyle={{ padding: '1rem' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export function Message({ message, isStreaming = false, isLast = false }: MessageComponentProps) {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        'flex gap-3 animate-in',
        message.role === 'user' && 'flex-row-reverse',
        isStreaming && 'opacity-80'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-canvas-soft flex items-center justify-center text-body-sm font-medium">
        {roleIcons[message.role]}
      </div>

      {/* Message bubble */}
      <div className={cn(
        'flex-1 max-w-[85%] min-w-0',
        message.role === 'user' ? 'text-right' : 'text-left'
      )}>
        <div className={cn(
          'relative rounded-lg p-4',
          message.role === 'user'
            ? 'bg-primary text-on-primary rounded-tr-none'
            : 'bg-canvas border border-hairline rounded-tl-none'
        )}>
          <div className="flex items-start gap-2 mb-2">
            <span className="font-medium text-body-sm">
              {roleLabels[message.role]}
            </span>
            {message.model && (
              <span className="badge ml-auto flex-shrink-0">
                {message.model}
              </span>
            )}
            <time className="text-caption-sm text-mute/70 ml-auto flex-shrink-0">
              {formatTime(message.timestamp)}
            </time>
          </div>

          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code: CodeBlock,
                pre: ({ children }) => children,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {message.toolCalls && message.toolCalls.length > 0 && (
            <details className="mt-3 group">
              <summary className="flex items-center gap-2 cursor-pointer text-caption-sm text-body hover:text-ink">
                <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
                <FileCode className="h-3 w-3" />
                <span>Tool calls ({message.toolCalls.length})</span>
              </summary>
              <div className="mt-2 space-y-2 pl-6 border-l border-hairline">
                {message.toolCalls.map((tc: { id: string; name: string; args: Record<string, unknown>; result?: unknown }) => (
                  <div key={tc.id} className="card-soft p-3 text-caption-sm font-mono">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-success">{tc.name}</span>
                      <span className="text-mute">{JSON.stringify(tc.args).slice(0, 100)}...</span>
                    </div>
                    {tc.result ? (
                      <details className="mt-1">
                        <summary className="cursor-pointer text-mute hover:text-body">Result</summary>
                        <pre className="mt-1 text-xs overflow-x-auto">
                          {(typeof tc.result === 'string' ? tc.result : JSON.stringify(tc.result, null, 2)) as string}
                        </pre>
                      </details>
                    ) : null}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        {/* Actions */}
        <div className={cn(
          'flex items-center gap-1 mt-1 opacity-0 transition-opacity',
          message.role === 'user' ? 'justify-end' : 'justify-start',
          showActions && 'opacity-100'
        )}>
          {message.role === 'assistant' && (
            <>
              <button
                onClick={handleCopy}
                className="btn-ghost p-1.5 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={copied ? 'Copied!' : 'Copy'}
              >
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              </button>
              <button className="btn-ghost p-1.5 h-7 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Regenerate">
                <RotateCcw className="h-3 w-3" />
              </button>
              <button className="btn-ghost p-1.5 h-7 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Fork conversation">
                <GitBranch className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}