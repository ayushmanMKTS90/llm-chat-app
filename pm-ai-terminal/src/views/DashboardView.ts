import { Box, Text, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { formatCurrency, formatNumber, getRelativeTime, getStatusColor, sparkline, truncate, getPriorityColor } from '../utils/formatters';
import { MetricCard, ProgressBar, Panel, Divider, Spacer } from '../components/ui';

export function DashboardView(renderer: any) {
  const activeSprint = dataService.getActiveSprint();
  const costMetrics = dataService.getCostMetrics();
  const productivityMetrics = dataService.getProductivityMetrics();
  const tasks = dataService.getTasks(activeSprint?.id);
  const aiAgentTasks = dataService.getAIAgentTasks();
  const risks = dataService.getRisks();
  
  const sprintProgress = activeSprint ? (activeSprint.completedPoints / activeSprint.storyPoints) * 100 : 0;
  const budgetUsed = (costMetrics.totalCost / costMetrics.monthlyBudget) * 100;
  const runningAgents = aiAgentTasks.filter(t => t.status === 'running').length;
  const criticalRisks = risks.filter(r => r.impact === 'critical' && r.status !== 'resolved').length;

  const sprintTrend = activeSprint ? `+${activeSprint.completedPoints}/${activeSprint.storyPoints} pts` : 'No active sprint';
  const costTrend = `+${costMetrics.trend[costMetrics.trend.length - 1]?.cost || 0}/day`;
  const velocityTrend = `Team: ${productivityMetrics.sprintVelocity} pts/sprint`;
  const aiTrend = `${(productivityMetrics.aiAssistedRatio * 100).toFixed(0)}% AI-assisted`;

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: '📊 PM AI TERMINAL  Terminal as a Service • AI Era Project Manager',
        fg: '#00FFFF',
        attributes: 1,
      }),
      Text({
        content: `Active Sprint: ${activeSprint?.name || 'None'}`,
        fg: '#FFAA00',
        attributes: 1,
      })
    ),

    Divider(),

    Box(
      { flexDirection: 'row', gap: 1, flexWrap: 'wrap' },
      MetricCard({
        title: 'Sprint Progress',
        value: `${sprintProgress.toFixed(0)}%`,
        trend: sprintTrend,
        trendUp: sprintProgress > 50,
        icon: '🏃',
        color: '#00AAFF',
        width: '25%',
      }),
      MetricCard({
        title: 'AI Cost (Month)',
        value: formatCurrency(costMetrics.totalCost),
        trend: costTrend,
        trendUp: false,
        icon: '💰',
        color: budgetUsed > 80 ? '#FF0000' : '#FFAA00',
        width: '25%',
      }),
      MetricCard({
        title: 'Team Velocity',
        value: `${productivityMetrics.sprintVelocity} pts`,
        trend: velocityTrend,
        trendUp: true,
        icon: '⚡',
        color: '#00FF00',
        width: '25%',
      }),
      MetricCard({
        title: 'AI Adoption',
        value: `${(productivityMetrics.aiAssistedRatio * 100).toFixed(0)}%`,
        trend: aiTrend,
        trendUp: true,
        icon: '🤖',
        color: '#AA00FF',
        width: '25%',
      })
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '📈 Sprint Burndown',
        width: '50%',
        flexGrow: 1,
        borderColor: '#00AAFF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'row', justifyContent: 'space-between' },
            Text({ content: 'Story Points Remaining', fg: '#FFFFFF', attributes: 1 }),
            Text({ content: `${activeSprint?.storyPoints - activeSprint?.completedPoints || 0} / ${activeSprint?.storyPoints || 0}`, fg: '#00FF00', attributes: 1 })
          ),
          ProgressBar({ progress: sprintProgress, width: '100%', color: '#00AAFF' }),
          Spacer(1),
          Text({ 
            content: 'Daily burn rate: ~3.2 pts/day  Projected completion: Jan 18',
            fg: '#888888'
          }),
          Spacer(1),
          Box({ height: 8, flexGrow: 1 },
            Text({ content: sparkline([85, 82, 78, 72, 68, 63, 58, 52, 45, 42, 38, 32, 25, 18, 12, 5, 0], 40), fg: '#00AAFF' }),
            Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            Text({ content: 'Jan 6                                    Jan 19', fg: '#888888' }),
          )
        )
      ),

      Panel({
        title: '🤖 AI Agent Activity',
        width: '50%',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'row', justifyContent: 'space-between' },
            Text({ content: 'Running Agents', fg: '#FFFFFF', attributes: 1 }),
            Text({ content: `${runningAgents} active • ${aiAgentTasks.length} total`, fg: '#00AAFF', attributes: 1 })
          ),
          ...aiAgentTasks.slice(0, 5).map(task => 
            Box({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 1 },
              Box({ flexDirection: 'row', alignItems: 'center', gap: 1 },
                Text({ content: `● ${task.name}`, fg: getStatusColor(task.status), width: 30 }),
                Text({ content: task.agentType, fg: '#888888', width: 15 })
              ),
              Box({ flexDirection: 'row', alignItems: 'center', gap: 2 },
                ProgressBar({ progress: task.progress, width: 15, color: getStatusColor(task.status), showPercent: false }),
                Text({ content: task.status.toUpperCase(), fg: getStatusColor(task.status), width: 12 })
              )
            )
          ),
          aiAgentTasks.length > 5 && Text({ content: `... and ${aiAgentTasks.length - 5} more agents`, fg: '#666666' })
        )
      )
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '⚠️ Active Risks',
        width: '40%',
        flexGrow: 1,
        borderColor: criticalRisks > 0 ? '#FF0000' : '#FFAA00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...risks.filter(r => r.status !== 'resolved').slice(0, 4).map(risk =>
            Box({ flexDirection: 'column', gap: 0, paddingBottom: 1 },
              Box({ flexDirection: 'row', justifyContent: 'space-between' },
                Text({ content: risk.title, fg: '#FFFFFF', attributes: 1, width: '70%' }),
                Text({ content: risk.status.toUpperCase(), fg: getStatusColor(risk.status), width: 15 })
              ),
              Text({ content: truncate(risk.description, 50), fg: '#888888' }),
              Box({ flexDirection: 'row', gap: 1, marginTop: 1 },
                Text({ content: `■ ${risk.probability}`, fg: getPriorityColor(risk.probability) }),
                Text({ content: `■ ${risk.impact}`, fg: getPriorityColor(risk.impact) }),
                risk.aiDetected && Text({ content: '🤖 AI-detected', fg: '#AA00FF' })
              )
            )
          ),
          risks.filter(r => r.status !== 'resolved').length > 4 && 
            Text({ content: `... ${risks.filter(r => r.status !== 'resolved').length - 4} more risks`, fg: '#666666' })
        )
      ),

      Panel({
        title: '💰 AI Cost Breakdown',
        width: '35%',
        flexGrow: 1,
        borderColor: '#FFAA00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...Object.entries(costMetrics.byModel).slice(0, 4).map(([model, data]) =>
            Box({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
              Text({ content: model, fg: '#FFFFFF', width: '60%' }),
              Text({ content: `${formatCurrency(data.cost)} (${formatNumber(data.tokens)} tokens)`, fg: '#FFAA00', attributes: 1, width: '40%' })
            )
          ),
          Divider('#333333'),
          Box({ flexDirection: 'row', justifyContent: 'space-between' },
            Text({ content: 'Total', fg: '#FFFFFF', attributes: 1 }),
            Text({ content: `${formatCurrency(costMetrics.totalCost)} / ${formatCurrency(costMetrics.monthlyBudget)}`, fg: '#FFAA00', attributes: 1 })
          ),
          ProgressBar({ progress: budgetUsed, width: '100%', color: budgetUsed > 80 ? '#FF0000' : '#FFAA00' }),
          Text({ content: `Daily: ${formatCurrency(costMetrics.dailyCost)}  Projection: ${formatCurrency(costMetrics.dailyCost * 30)}`, fg: '#888888' })
        )
      ),

      Panel({
        title: '👥 Team Capacity',
        width: '25%',
        flexGrow: 1,
        borderColor: '#00FF00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...dataService.getTeamMembers().slice(0, 5).map(member => {
            const utilPercent = (member.allocated / member.capacity) * 100;
            const color = utilPercent > 90 ? '#FF0000' : utilPercent > 70 ? '#FFAA00' : '#00FF00';
            return Box({ flexDirection: 'column', gap: 0 },
              Box({ flexDirection: 'row', justifyContent: 'space-between' },
                Text({ content: `${member.avatar} ${member.name}`, fg: '#FFFFFF', width: '60%' }),
                Text({ content: `${utilPercent.toFixed(0)}%`, fg: color, attributes: 1, width: '40%' })
              ),
              ProgressBar({ progress: utilPercent, width: '100%', height: 1, color, showPercent: false })
            );
          }),
          dataService.getTeamMembers().length > 5 && 
            Text({ content: `... ${dataService.getTeamMembers().length - 5} more members`, fg: '#666666' })
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1, marginTop: 1 },
      Text({ content: `Last updated: ${getRelativeTime(new Date())}`, fg: '#666666' }),
      Text({ content: '[1] Dashboard  [2] AI Agents  [3] Sprint  [4] Costs  [5] Team  [6] Risks  [7] Comms', fg: '#666666' })
    )
  );
}