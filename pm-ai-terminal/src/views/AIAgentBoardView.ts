import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { formatCurrency, getRelativeTime, getStatusColor, truncate, formatNumber } from '../utils/formatters';
import { Panel, ProgressBar, Divider, Spacer } from '../components/ui';

export function AIAgentBoardView(renderer: any, selectedIndex: number = 0, onSelect: (index: number) => void) {
  const aiAgentTasks = dataService.getAIAgentTasks();
  const costMetrics = dataService.getCostMetrics();
  
  const statusCounts = {
    pending: aiAgentTasks.filter(t => t.status === 'pending').length,
    running: aiAgentTasks.filter(t => t.status === 'running').length,
    completed: aiAgentTasks.filter(t => t.status === 'completed').length,
    failed: aiAgentTasks.filter(t => t.status === 'failed').length,
    'needs-review': aiAgentTasks.filter(t => t.status === 'needs-review').length,
  };

  const totalCost = aiAgentTasks.reduce((sum, t) => sum + t.cost, 0);
  const totalTokens = aiAgentTasks.reduce((sum, t) => sum + t.tokensUsed, 0);

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: '🤖 AI AGENT TASK BOARD  Manage and monitor AI-powered development agents',
        fg: '#AA00FF',
        attributes: 1,
      }),
      Box({ flexDirection: 'row', gap: 2, alignItems: 'center' },
        Text({ content: `● ${statusCounts.running} running`, fg: '#00FF00' }),
        Text({ content: `● ${statusCounts.pending} pending`, fg: '#FFAA00' }),
        Text({ content: `● ${statusCounts['needs-review']} review`, fg: '#AA00FF' }),
        Text({ content: `● ${statusCounts.failed} failed`, fg: '#FF0000' }),
        Text({ content: `✓ ${statusCounts.completed} done`, fg: '#00FF00' }),
      )
    ),

    Divider(),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '📋 Agent Tasks',
        width: '55%',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 0, flexGrow: 1 },
          Box({ flexDirection: 'row', backgroundColor: '#2A2A3E', paddingLeft: 1, paddingRight: 1 },
            Text({ content: 'Task Name'.padEnd(28), fg: '#AA00FF', attributes: 1, width: 28 }),
            Text({ content: 'Type'.padEnd(14), fg: '#AA00FF', attributes: 1, width: 14 }),
            Text({ content: 'Assignee'.padEnd(14), fg: '#AA00FF', attributes: 1, width: 14 }),
            Text({ content: 'Model'.padEnd(16), fg: '#AA00FF', attributes: 1, width: 16 }),
            Text({ content: 'Progress', fg: '#AA00FF', attributes: 1, width: 10 }),
            Text({ content: 'Status'.padEnd(12), fg: '#AA00FF', attributes: 1, width: 12 }),
            Text({ content: 'Cost', fg: '#AA00FF', attributes: 1, width: 10 }),
          ),
          ...aiAgentTasks.map((task, index) => {
            const isSelected = index === selectedIndex;
            const rowColor = isSelected ? '#AA00FF' : (index % 2 === 0 ? '#FFFFFF' : '#888888');
            return Box(
              {
                flexDirection: 'row',
                backgroundColor: isSelected ? '#3A3A5E' : (index % 2 === 0 ? '#1E1E2E' : '#1A1A2E'),
                paddingLeft: 1,
                paddingRight: 1,
                onMouseDown: () => onSelect(index),
              },
              Text({ content: truncate(task.name, 28).padEnd(28), fg: isSelected ? '#AA00FF' : '#FFFFFF', width: 28 }),
              Text({ content: task.agentType.padEnd(14), fg: rowColor, width: 14 }),
              Text({ content: task.assignedTo.padEnd(14), fg: rowColor, width: 14 }),
              Text({ content: task.model.padEnd(16), fg: rowColor, width: 16 }),
              Box({ width: 10, alignItems: 'center' },
                ProgressBar({ progress: task.progress, width: 10, color: getStatusColor(task.status), showPercent: false })
              ),
              Text({ content: task.status.toUpperCase().padEnd(12), fg: getStatusColor(task.status), width: 12 }),
              Text({ content: formatCurrency(task.cost), fg: '#FFAA00', width: 10 }),
            );
          })
        )
      ),

      Box(
        { flexDirection: 'column', gap: 1, width: '45%', flexGrow: 1 },
        
        Panel({
          title: '📊 Task Details',
          flexGrow: 1,
          borderColor: '#444444',
        },
          aiAgentTasks.length > 0 ? (() => {
            const task = aiAgentTasks[selectedIndex];
            const statusCol = getStatusColor(task.status);
            return Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
              Box({ flexDirection: 'row', justifyContent: 'space-between' },
                Text({ content: task.name, fg: '#FFFFFF', attributes: 1 }),
                Text({ content: task.status.toUpperCase(), fg: statusCol })
              ),
              Divider('#333333'),
              Text({ content: `Description: ${task.description}`, fg: '#AAAAAA' }),
              Divider('#333333'),
              Box({ flexDirection: 'row', gap: 2 },
                Box({ flexDirection: 'column', gap: 0 },
                  Text({ content: `Assignee: ${task.assignedTo}`, fg: '#FFFFFF' }),
                  Text({ content: `Model: ${task.model}`, fg: '#00AAFF' }),
                  Text({ content: `Type: ${task.agentType}`, fg: '#AA00FF' }),
                ),
                Box({ flexDirection: 'column', gap: 0 },
                  Text({ content: `Progress: ${task.progress}%`, fg: '#00AAFF', attributes: 1 }),
                  Text({ content: `Tokens: ${formatNumber(task.tokensUsed)}`, fg: '#FFAA00' }),
                  Text({ content: `Cost: ${formatCurrency(task.cost)}`, fg: '#FFAA00', attributes: 1 }),
                )
              ),
              task.startedAt && Text({ content: `Started: ${getRelativeTime(task.startedAt)}`, fg: '#AAAAAA' }),
              task.completedAt && Text({ content: `Completed: ${getRelativeTime(task.completedAt)}`, fg: '#AAAAAA' }),
              task.error && Box({ flexDirection: 'column', marginTop: 1, padding: 1, backgroundColor: '#331111', borderStyle: 'rounded', borderColor: '#FF0000' },
                Text({ content: '⚠ Error:', fg: '#FF0000', attributes: 1 }),
                Text({ content: task.error, fg: '#FFAAAA' })
              ),
              task.result && Box({ flexDirection: 'column', marginTop: 1, padding: 1, backgroundColor: '#113311', borderStyle: 'rounded', borderColor: '#00FF00' },
                Text({ content: '✓ Result:', fg: '#00FF00', attributes: 1 }),
                Text({ content: truncate(task.result, 200), fg: '#AAFFAA' })
              )
            );
          })() : Text({ content: 'No agent tasks available', fg: '#666666' })
        ),

        Panel({
          title: '💰 Cost Summary',
          borderColor: '#FFAA00',
        },
          Box({ flexDirection: 'column', gap: 1 },
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: `Total Tasks: ${aiAgentTasks.length}`, fg: '#FFFFFF', attributes: 1 }),
              Text({ content: `Total Cost: ${formatCurrency(totalCost)}`, fg: '#FFAA00', attributes: 1 })
            ),
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: `Total Tokens: ${formatNumber(totalTokens)}`, fg: '#FFFFFF', attributes: 1 }),
              Text({ content: `Avg/Task: ${formatCurrency(aiAgentTasks.length > 0 ? totalCost / aiAgentTasks.length : 0)}`, fg: '#FFAA00', attributes: 1 })
            ),
            Divider('#333333'),
            Text({ content: 'By Agent Type:', fg: '#FFAA00', attributes: 1 }),
            ...Object.entries(costMetrics.byAgentType).slice(0, 5).map(([type, data]) =>
              Box({ flexDirection: 'row', justifyContent: 'space-between' },
                Text({ content: type, fg: '#AAAAAA' }),
                Text({ content: `${formatCurrency(data.cost)} (${data.tasks} tasks)`, fg: '#FFAA00', attributes: 1 })
              )
            )
          )
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1 },
      Text({ content: '↑/↓ Navigate  [Enter] Details  [R] Retry Failed  [N] New Agent  [Esc] Back', fg: '#666666' }),
      Text({ content: `Total: ${aiAgentTasks.length} tasks • ${formatCurrency(totalCost)} • ${formatNumber(totalTokens)} tokens`, fg: '#666666' })
    )
  );
}