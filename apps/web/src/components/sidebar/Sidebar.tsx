'use client';

import { useState } from 'react';
import { Plus, Folder, ChevronRight, ChevronDown, MoreHorizontal, MessageSquare, Calendar, Clock, Archive, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
  model: string;
  folder?: string;
}

interface FolderItem {
  id: string;
  name: string;
  conversations: Conversation[];
  expanded: boolean;
}

const mockFolders: FolderItem[] = [
  {
    id: 'today',
    name: 'Today',
    expanded: true,
    conversations: [
      { id: '1', title: 'Project planning with MCP', updatedAt: new Date(), model: 'llama3.1:8b' },
      { id: '2', title: 'API design review', updatedAt: new Date(Date.now() - 3600000), model: 'gpt-4o-mini' },
    ],
  },
  {
    id: 'yesterday',
    name: 'Yesterday',
    expanded: true,
    conversations: [
      { id: '3', title: 'Database optimization', updatedAt: new Date(Date.now() - 86400000), model: 'claude-3-5-haiku' },
    ],
  },
  {
    id: 'this-week',
    name: 'This Week',
    expanded: false,
    conversations: [
      { id: '4', title: 'React performance tips', updatedAt: new Date(Date.now() - 172800000), model: 'llama3.1:8b' },
      { id: '5', title: 'TypeScript generics deep dive', updatedAt: new Date(Date.now() - 259200000), model: 'gpt-4o-mini' },
    ],
  },
  {
    id: 'older',
    name: 'Older',
    expanded: false,
    conversations: [
      { id: '6', title: 'Docker best practices', updatedAt: new Date(Date.now() - 604800000), model: 'claude-3-5-haiku' },
    ],
  },
];

export function Sidebar({ onClose }: { onClose: () => void }) {
  const [folders] = useState<FolderItem[]>(mockFolders);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full border-r border-hairline">
      {/* New chat button */}
      <div className="p-4 border-b border-hairline">
        <button className="btn-primary w-full justify-start gap-3">
          <Plus className="h-4 w-4" />
          <span>New chat</span>
        </button>
      </div>

      {/* Folders */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4" role="navigation" aria-label="Conversations">
        {folders.map((folder) => (
          <div key={folder.id} className="space-y-1">
            <button
              className={cn(
                'flex items-center gap-2 w-full px-2 py-1 text-body-sm font-medium text-body hover:text-ink transition-colors rounded-md',
                folder.expanded && 'text-ink'
              )}
              onClick={() => {
                folder.expanded = !folder.expanded;
                // Force re-render
              }}
            >
              {folder.expanded ? (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              )}
              <Folder className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{folder.name}</span>
              <span className="ml-auto text-caption-sm text-mute">
                {folder.conversations.length}
              </span>
            </button>

            {folder.expanded && (
              <div className="space-y-1 pl-6">
                {folder.conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={cn(
                      'flex items-center gap-2 w-full px-2 py-2 text-body-sm text-body hover:bg-canvas-soft hover:text-ink transition-colors rounded-md group',
                      'relative'
                    )}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0 text-mute group-hover:text-ink transition-colors" />
                    <span className="truncate flex-1">{conv.title}</span>
                    <span className="text-caption-sm text-mute hidden group-hover:block">{formatTime(conv.updatedAt)}</span>
                    <span className="badge hidden group-hover:inline-flex">{conv.model}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-hairline space-y-2">
        <button className="btn-ghost w-full justify-start gap-2 px-3">
          <Archive className="h-4 w-4" />
          <span>Archive</span>
        </button>
        <button className="btn-ghost w-full justify-start gap-2 px-3">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}