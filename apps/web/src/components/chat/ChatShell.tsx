'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { Menu, X, Send, Plus, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'sidebar',
          !sidebarOpen && 'collapsed',
          mobileSidebarOpen && 'lg:translate-x-0',
          !mobileSidebarOpen && 'lg:translate-x-0'
        )}
      >
        <Sidebar onClose={() => setMobileSidebarOpen(false)} />
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top nav */}
        <header className="nav-bar flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              className="btn-ghost p-2 lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              className="btn-ghost p-2 hidden lg:flex"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
            <h1 className="text-heading-lg font-display font-semibold">LLM Chat</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-ghost p-2" aria-label="Search conversations">
              <Search className="h-5 w-5" />
            </button>
            <button className="btn-primary" aria-label="New chat">
              <Plus className="h-4 w-4" />
            </button>
            <button className="btn-ghost p-2" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Chat area */}
        <ChatArea />
      </main>
    </div>
  );
}