'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Cpu, Cloud, Globe, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  provider: 'ollama' | 'openai' | 'anthropic' | 'openrouter';
  contextWindow: number;
  supportsVision: boolean;
  supportsTools: boolean;
}

const models: Model[] = [
  { id: 'llama3.1:8b', name: 'Llama 3.1 8B', provider: 'ollama', contextWindow: 128000, supportsVision: false, supportsTools: true },
  { id: 'qwen2.5:7b', name: 'Qwen 2.5 7B', provider: 'ollama', contextWindow: 32768, supportsVision: false, supportsTools: true },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'openai', contextWindow: 128000, supportsVision: true, supportsTools: true },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', contextWindow: 128000, supportsVision: true, supportsTools: true },
  { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', provider: 'anthropic', contextWindow: 200000, supportsVision: true, supportsTools: true },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', contextWindow: 200000, supportsVision: true, supportsTools: true },
  { id: 'openrouter/auto', name: 'OpenRouter Auto', provider: 'openrouter', contextWindow: 128000, supportsVision: true, supportsTools: true },
];

const providerIcons: Record<Model['provider'], LucideIcon> = {
  ollama: Cpu,
  openai: Sparkles,
  anthropic: Globe,
  openrouter: Cloud,
};

const providerLabels: Record<Model['provider'], string> = {
  ollama: 'Local (Ollama)',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  openrouter: 'OpenRouter',
};

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function ProviderIcon({ provider }: { provider: Model['provider'] }) {
  const Icon = providerIcons[provider];
  return <Icon className="h-4 w-4" />;
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedModel = models.find((m) => m.id === value) || models[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          'btn-secondary flex items-center gap-2 px-3 py-1.5 min-w-[200px] max-w-[280px]',
          disabled && 'opacity-50'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select model"
      >
        <ProviderIcon provider={selectedModel.provider} />
        <span className="truncate text-body-sm-strong">{selectedModel.name}</span>
        <span className="badge ml-auto">{providerLabels[selectedModel.provider]}</span>
        <ChevronDown className={cn('h-4 w-4 flex-shrink-0', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="fixed z-50 mt-2 w-[280px] rounded-lg bg-canvas border border-hairline shadow-lg animate-in">
            <div className="p-2 border-b border-hairline">
              <input
                type="text"
                placeholder="Search models..."
                className="input-pill w-full text-body-sm"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(
                models.reduce((acc, model) => {
                  const key = providerLabels[model.provider];
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(model);
                  return acc;
                }, {} as Record<string, Model[]>)
              ).map(([provider, providerModels]) => (
                <div key={provider} className="border-b border-hairline last:border-0">
                  <div className="px-3 py-2 text-caption-sm font-medium text-body uppercase tracking-wide">
                    {provider}
                  </div>
                  {providerModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onChange(model.id);
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full px-3 py-2 text-left text-body-sm transition-colors hover:bg-canvas-soft',
                        value === model.id && 'bg-canvas-soft text-ink font-medium'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ProviderIcon provider={model.provider} />
                        <span className="truncate">{model.name}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-caption-sm text-mute">
                        {model.supportsVision && <span className="badge">Vision</span>}
                        {model.supportsTools && <span className="badge">Tools</span>}
                        <span>{model.contextWindow.toLocaleString()} ctx</span>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}