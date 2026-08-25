import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { formatCurrency, formatNumber, sparkline, getRelativeTime } from '../utils/formatters';
import { Panel, MetricCard, Divider, Spacer, ProgressBar } from '../components/ui';

export function CostMonitorView(renderer: any) {
  const costMetrics = dataService.getCostMetrics();
  const aiAgentTasks = dataService.getAIAgentTasks();
  const teamMembers = dataService.getTeamMembers();
  
  const budgetUsed = (costMetrics.totalCost / costMetrics.monthlyBudget) * 100;
  const projectedMonthly = costMetrics.dailyCost * 30;
  const projectedOverrun = projectedMonthly > costMetrics.monthlyBudget;
  const daysLeftInMonth = 30 - new Date().getDate();

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: '💰 AI COST MONITOR  Track and optimize AI model spending',
        fg: '#FFAA00',
        attributes: 1,
      }),
      Box({ flexDirection: 'row', gap: 2 },
        Text({ content: projectedOverrun ? '⚠ PROJECTED OVERRUN' : '✓ On Budget', fg: projectedOverrun ? '#FF0000' : '#00FF00', attributes: 1 }),
        Text({ content: `${daysLeftInMonth} days left`, fg: '#888888' })
      )
    ),

    Divider(),

    Box(
      { flexDirection: 'row', gap: 1 },
      MetricCard({
        title: 'Month to Date',
        value: formatCurrency(costMetrics.totalCost),
        trend: `${formatCurrency(projectedMonthly)} projected`,
        trendUp: projectedOverrun,
        icon: '📅',
        color: projectedOverrun ? '#FF0000' : '#FFAA00',
        width: '25%',
      }),
      MetricCard({
        title: 'Daily Average',
        value: formatCurrency(costMetrics.dailyCost),
        trend: `${formatCurrency(costMetrics.dailyCost * 7)}/week`,
        trendUp: false,
        icon: '📊',
        color: '#00AAFF',
        width: '25%',
      }),
      MetricCard({
        title: 'Budget Used',
        value: `${budgetUsed.toFixed(1)}%`,
        trend: `${formatCurrency(costMetrics.monthlyBudget - costMetrics.totalCost)} remaining`,
        trendUp: budgetUsed > 80,
        icon: '💳',
        color: budgetUsed > 80 ? '#FF0000' : budgetUsed > 60 ? '#FFAA00' : '#00FF00',
        width: '25%',
      }),
      MetricCard({
        title: 'Cost per Task',
        value: formatCurrency(aiAgentTasks.length > 0 ? costMetrics.totalCost / aiAgentTasks.length : 0),
        trend: `${aiAgentTasks.length} tasks this month`,
        trendUp: false,
        icon: '🎯',
        color: '#AA00FF',
        width: '25%',
      })
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '📈 Daily Cost Trend (30 days)',
        width: '50%',
        flexGrow: 1,
        borderColor: '#FFAA00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ height: 12, flexGrow: 1 },
            Text({ content: sparkline(costMetrics.trend.map(t => t.cost), 50), fg: '#FFAA00' }),
            Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            Text({ content: '30 days ago                                    Today', fg: '#888888' }),
          ),
          Divider('#333333'),
          Box({ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
            Text({ content: `Min: ${formatCurrency(Math.min(...costMetrics.trend.map(t => t.cost)))}`, fg: '#00FF00', attributes: 1 }),
            Text({ content: `Max: ${formatCurrency(Math.max(...costMetrics.trend.map(t => t.cost)))}`, fg: '#FF0000', attributes: 1 }),
            Text({ content: `Avg: ${formatCurrency(costMetrics.trend.reduce((a, b) => a + b.cost, 0) / costMetrics.trend.length)}`, fg: '#FFAA00', attributes: 1 }),
            Text({ content: `Trend: ↗ Rising`, fg: costMetrics.trend[costMetrics.trend.length - 1].cost > costMetrics.trend[0].cost ? '#FF0000' : '#00FF00', attributes: 1 }),
          )
        )
      ),

      Panel({
        title: '🤖 Cost by Model',
        width: '50%',
        flexGrow: 1,
        borderColor: '#00AAFF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...Object.entries(costMetrics.byModel).map(([model, data]) => {
            const pct = (data.cost / costMetrics.totalCost) * 100;
            return Box({ flexDirection: 'column', gap: 0 },
              Box({ flexDirection: 'row', justifyContent: 'space-between' },
                Text({ content: model, fg: '#FFFFFF' }),
                Text({ content: `${formatCurrency(data.cost)} (${pct.toFixed(1)}%)`, fg: '#FFAA00', attributes: 1 })
              ),
              ProgressBar({ progress: pct, width: '100%', color: '#00AAFF', bgColor: '#222222', showPercent: false }),
              Text({ content: `${formatNumber(data.tokens)} tokens • ${data.requests} requests`, fg: '#666666' })
            );
          })
        )
      )
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '👥 Cost by Team Member',
        width: '40%',
        flexGrow: 1,
        borderColor: '#00FF00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...Object.entries(costMetrics.byTeamMember)
            .sort(([,a], [,b]) => b.cost - a.cost)
            .map(([memberId, data]) => {
              const member = teamMembers.find(m => m.id === memberId);
              return Box({ flexDirection: 'column', gap: 0 },
                Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: `${member?.avatar || '👤'} ${member?.name || memberId}`, fg: '#FFFFFF' }),
                  Text({ content: `${formatCurrency(data.cost)} (${data.tasks} tasks)`, fg: '#FFAA00', attributes: 1 })
                ),
                ProgressBar({ 
                  progress: (data.cost / costMetrics.totalCost) * 100, 
                  width: '100%', 
                  color: '#00FF00', 
                  bgColor: '#222222', 
                  showPercent: false 
                })
              );
            })
        )
      ),

      Panel({
        title: '📋 Cost by Agent Type',
        width: '35%',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...Object.entries(costMetrics.byAgentType)
            .sort(([,a], [,b]) => b.cost - a.cost)
            .map(([type, data]) => {
              const pct = (data.cost / costMetrics.totalCost) * 100;
              return Box({ flexDirection: 'column', gap: 0 },
                Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: type, fg: '#FFFFFF' }),
                  Text({ content: `${formatCurrency(data.cost)} (${pct.toFixed(1)}%)`, fg: '#FFAA00', attributes: 1 })
                ),
                ProgressBar({ progress: pct, width: '100%', color: '#AA00FF', bgColor: '#222222', showPercent: false })
              );
            })
        )
      ),

      Panel({
        title: '💡 Optimization Recommendations',
        width: '25%',
        flexGrow: 1,
        borderColor: '#00FFFF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: '1. Model Routing', fg: '#00FFFF', attributes: 1 }),
            Text({ content: 'Route simple tasks to GPT-4o-mini', fg: '#AAAAAA' }),
            Text({ content: 'Potential savings: ~$180/mo', fg: '#888888' }),
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: '2. Caching', fg: '#00FFFF', attributes: 1 }),
            Text({ content: 'Cache repeated doc-gen prompts', fg: '#AAAAAA' }),
            Text({ content: 'Potential savings: ~$95/mo', fg: '#888888' }),
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: '3. Batch Processing', fg: '#00FFFF', attributes: 1 }),
            Text({ content: 'Batch security audits nightly', fg: '#AAAAAA' }),
            Text({ content: 'Potential savings: ~$60/mo', fg: '#888888' }),
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: '4. Token Budgets', fg: '#00FFFF', attributes: 1 }),
            Text({ content: 'Set per-agent token limits', fg: '#AAAAAA' }),
            Text({ content: 'Prevents runaway costs', fg: '#888888' }),
          )
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1 },
      Text({ content: `Budget: ${formatCurrency(costMetrics.monthlyBudget)}/mo • Updated: ${getRelativeTime(new Date())}`, fg: '#666666' }),
      Text({ content: '[R] Refresh  [E] Export CSV  [A] Alerts  [Esc] Back', fg: '#666666' })
    )
  );
}