export function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(2)}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDuration(hours: number): string {
  if (hours >= 24) {
    return `${(hours / 24).toFixed(1)}d`;
  }
  return `${hours.toFixed(1)}h`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'active': '#00FF00',
    'planning': '#FFAA00',
    'review': '#00AAFF',
    'done': '#888888',
    'backlog': '#666666',
    'ready': '#00AAFF',
    'in-progress': '#FFAA00',
    'in-review': '#AA00FF',
    'blocked': '#FF0000',
    'completed': '#00FF00',
    'running': '#00AAFF',
    'pending': '#666666',
    'failed': '#FF0000',
    'needs-review': '#AA00FF',
    'identified': '#FFAA00',
    'analyzing': '#00AAFF',
    'mitigating': '#FFAA00',
    'monitoring': '#00FFAA',
    'resolved': '#00FF00',
  };
  return colors[status] || '#FFFFFF';
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    'critical': '#FF0000',
    'high': '#FFAA00',
    'medium': '#00AAFF',
    'low': '#888888',
  };
  return colors[priority] || '#FFFFFF';
}

export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    'feature': '✨',
    'bug': '🐛',
    'tech-debt': '🔧',
    'ai-research': '🧠',
    'prompt-engineering': '💬',
    'model-eval': '📊',
    'test-gen': '🧪',
    'code-gen': '🤖',
    'code-review': '👀',
    'doc-gen': '📝',
    'refactor': '♻️',
    'security-audit': '🔒',
    'perf-analysis': '⚡',
  };
  return icons[type] || '📋';
}

export function getRoleIcon(role: string): string {
  const icons: Record<string, string> = {
    'pm': '🎯',
    'tech-lead': '👑',
    'senior-dev': '⭐',
    'dev': '👨‍💻',
    'qa': '🧪',
    'designer': '🎨',
    'data-scientist': '📈',
    'ml-engineer': '🤖',
  };
  return icons[role] || '👤';
}

export function getProficiencyColor(level: string): string {
  const colors: Record<string, string> = {
    'expert': '#00FF00',
    'advanced': '#00AAFF',
    'intermediate': '#FFAA00',
    'beginner': '#FF0000',
  };
  return colors[level] || '#FFFFFF';
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

export function createProgressBar(progress: number, width: number = 20): string {
  const filled = Math.round((progress / 100) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

export function sparkline(data: number[], width: number = 30): string {
  if (data.length === 0) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const step = data.length / width;
  
  let result = '';
  for (let i = 0; i < width; i++) {
    const idx = Math.min(Math.floor(i * step), data.length - 1);
    const normalized = (data[idx] - min) / range;
    const charIdx = Math.min(Math.floor(normalized * (chars.length - 1)), chars.length - 1);
    result += chars[charIdx];
  }
  return result;
}