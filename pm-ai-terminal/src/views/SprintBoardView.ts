import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { getRelativeTime, getStatusColor, getPriorityColor, getTypeIcon, truncate } from '../utils/formatters';
import { Panel, Divider, Spacer, StatusBadge } from '../components/ui';

export function SprintBoardView(renderer: any, selectedIndex: number = 0, onSelect: (index: number) => void, viewMode: 'sprint' | 'backlog' = 'sprint') {
  const sprints = dataService.getSprints();
  const activeSprint = dataService.getActiveSprint();
  const tasks = viewMode === 'sprint' && activeSprint 
    ? dataService.getTasks(activeSprint.id)
    : dataService.getTasks().filter(t => !t.sprintId || t.status === 'backlog');
  
  const statusColumns = [
    { key: 'backlog', label: '📥 Backlog', color: '#666666' },
    { key: 'ready', label: '✅ Ready', color: '#00AAFF' },
    { key: 'in-progress', label: '🔄 In Progress', color: '#FFAA00' },
    { key: 'in-review', label: '👀 In Review', color: '#AA00FF' },
    { key: 'done', label: '✓ Done', color: '#00FF00' },
    { key: 'blocked', label: '🚫 Blocked', color: '#FF0000' },
  ];

  const tasksByStatus = statusColumns.reduce((acc, col) => {
    acc[col.key] = tasks.filter(t => t.status === col.key);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: viewMode === 'sprint' ? `🏃 SPRINT & BACKLOG  Active: ${activeSprint?.name}` : '🏃 SPRINT & BACKLOG  Product Backlog',
        fg: '#00FFFF',
        attributes: 1,
      }),
      Box({ flexDirection: 'row', gap: 2 },
        Text({ content: '[S] Sprint  [B] Backlog  [N] New Task  [F] Filter', fg: '#888888' })
      )
    ),

    Divider(),

    activeSprint && viewMode === 'sprint' && Box(
      { flexDirection: 'row', gap: 1, height: 4, marginBottom: 1 },
      Panel({ title: '📊 Sprint Info', width: '40%', borderColor: '#00AAFF' },
        Box({ flexDirection: 'column', gap: 0, padding: 1 },
          Text({ content: activeSprint.name, fg: '#FFFFFF', attributes: 1 }),
          Text({ content: `Goal: ${activeSprint.goal}`, fg: '#AAAAAA' }),
          Text({ content: `Dates: ${activeSprint.startDate.toLocaleDateString()} - ${activeSprint.endDate.toLocaleDateString()}`, fg: '#AAAAAA' }),
          Text({ content: `Progress: ${((activeSprint.completedPoints / activeSprint.storyPoints) * 100).toFixed(0)}% (${activeSprint.completedPoints}/${activeSprint.storyPoints} pts)`, fg: '#00AAFF', attributes: 1 }),
        )
      ),
      Panel({ title: '📈 Health', width: '30%', borderColor: '#00FF00' },
        Box({ flexDirection: 'column', gap: 0, padding: 1 },
          Text({ content: 'Velocity: 38 pts/sprint', fg: '#00FF00', attributes: 1 }),
          Text({ content: 'AI Assisted: 67%', fg: '#AA00FF', attributes: 1 }),
          Text({ content: `Blockers: ${tasksByStatus.blocked.length}`, fg: '#FF0000', attributes: 1 }),
          Text({ content: `In Review: ${tasksByStatus['in-review'].length}`, fg: '#AA00FF', attributes: 1 }),
        )
      ),
      Panel({ title: '👥 Capacity', width: '30%', borderColor: '#FFAA00' },
        Box({ flexDirection: 'column', gap: 0, padding: 1 },
          ...dataService.getTeamMembers().slice(0, 3).map(m => {
            const color = m.allocated > m.capacity * 0.9 ? '#FF0000' : '#00FF00';
            return Text({ content: `${m.avatar} ${m.name}: ${m.allocated}/${m.capacity}h`, fg: color, attributes: 1 });
          })
        )
      )
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1, alignItems: 'flex-start' },
      ...statusColumns.map((col, colIndex) => {
        const colTasks = tasksByStatus[col.key];
        return Panel({
          title: `${col.label} (${colTasks.length})`,
          width: `${100 / statusColumns.length}%`,
          flexGrow: 1,
          borderColor: col.color,
        },
          Box({ flexDirection: 'column', gap: 1, flexGrow: 1, overflow: 'auto' },
            ...colTasks.map((task, taskIndex) => {
              const globalIndex = tasks.indexOf(task);
              const isSelected = globalIndex === selectedIndex;
              const borderCol = isSelected ? '#00FFFF' : (task.aiAssisted ? '#AA00FF55' : '#333333');
              const titleCol = isSelected ? '#00FFFF' : '#FFFFFF';
              return Box(
                {
                  flexDirection: 'column',
                  gap: 0,
                  padding: 1,
                  backgroundColor: isSelected ? '#3A3A5E' : '#1E1E2E',
                  borderStyle: 'rounded',
                  borderColor: borderCol,
                  onMouseDown: () => onSelect(globalIndex),
                },
                Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: `${getTypeIcon(task.type)} ${truncate(task.title, 25)}`, fg: titleCol, attributes: 1 }),
                  Box({ flexDirection: 'row', gap: 1 },
                    task.aiAssisted && Text({ content: '🤖', fg: '#AA00FF' }),
                    Text({ content: '●', fg: getPriorityColor(task.priority) })
                  )
                ),
                Text({ content: truncate(task.description, 40), fg: '#888888' }),
                Box({ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 },
                  Text({ content: task.assignee, fg: '#666666' }),
                  Text({ content: `${task.storyPoints} pts`, fg: '#FFAA00' })
                )
              );
            }),
            colTasks.length === 0 && Text({ content: '(empty)', fg: '#444444' })
          )
        );
      })
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1 },
      Text({ content: `Tasks: ${tasks.length} • Press [Tab] to switch columns  [Enter] Edit  [D] Move  [Del] Delete`, fg: '#666666' }),
      Text({ content: 'AI-assisted tasks marked with 🤖', fg: '#666666' })
    )
  );
}