'use client';

import { useRef, useEffect } from 'react';
import { Paperclip, Mic, Send, X, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  attachments?: Attachment[];
  onRemoveAttachment?: (index: number) => void;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'text';
  size: number;
  preview?: string;
  file: File;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled,
  placeholder = 'Message...',
  attachments = [],
  onRemoveAttachment,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    // Trigger resize
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
      }
    }, 0);
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-4">
          {attachments.map((attachment, index) => (
            <div key={attachment.id} className="flex items-center gap-2 rounded-pill bg-canvas-soft px-3 py-1">
              {attachment.type === 'image' && attachment.preview && (
                <img src={attachment.preview} alt={attachment.name} className="h-6 w-6 rounded-md object-cover" />
              )}
              {attachment.type !== 'image' && (
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-canvas border border-hairline">
                  {attachment.type === 'pdf' ? <FileText className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                </div>
              )}
              <span className="text-body-sm truncate max-w-[150px]">{attachment.name}</span>
              <span className="text-caption-sm text-mute">{(attachment.size / 1024).toFixed(1)} KB</span>
              <button
                type="button"
                onClick={() => onRemoveAttachment?.(index)}
                className="btn-ghost p-1 h-6 w-6 rounded-full"
                aria-label="Remove attachment"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          type="button"
          className={cn('btn-ghost p-2 h-10 flex-shrink-0', disabled && 'opacity-50')}
          aria-label="Attach files"
          disabled={disabled}
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={cn(
              'textarea-card w-full min-h-[44px] max-h-[200px] pr-12 resize-none',
              disabled && 'opacity-50'
            )}
            disabled={disabled}
            rows={1}
            aria-label="Chat input"
            spellCheck={true}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-3 bottom-3 btn-ghost p-1 h-7 w-7 rounded-full"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn('btn-ghost p-2 h-10 flex-shrink-0', disabled && 'opacity-50')}
            aria-label="Voice input"
            disabled={disabled || !!value}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className={cn(
              'btn-primary h-10 min-w-[44px] flex-shrink-0',
              (!value.trim() || disabled) && 'opacity-50 pointer-events-none'
            )}
            disabled={!value.trim() || disabled}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-center text-caption-sm text-mute">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
}