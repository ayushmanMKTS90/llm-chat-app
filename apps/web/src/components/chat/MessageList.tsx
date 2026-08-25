'use client';

import { Message } from './Message';
import { Message as MessageType } from './types';

interface MessageListProps {
  messages: MessageType[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  return (
    <div className="flex flex-col gap-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} isLast={message.id === messages[messages.length - 1]?.id} />
      ))}
      {isStreaming && (
        <div className="animate-pulse" aria-hidden="true">
          <Message
            message={{
              id: 'streaming',
              role: 'assistant',
              content: '▋',
              timestamp: new Date(),
            }}
            isStreaming
          />
        </div>
      )}
    </div>
  );
}