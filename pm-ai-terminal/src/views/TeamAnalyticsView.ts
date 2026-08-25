import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { formatNumber, getProficiencyColor, getRoleIcon, sparkline } from '../utils/formatters';
import { Panel, MetricCard, Divider, ProgressBar } from '../components/ui';

export function TeamAnalyticsView(renderer: any) {
  const teamMembers = dataService.getTeamMembers();
  const productivityMetrics = dataService.getProductivityMetrics();
  const tasks = dataService.getTasks();
  const aiAgentTasks = dataService.getAIAgentTasks();
  
  const totalCapacity = teamMembers.reduce((sum, m) => sum + m.capacity, 0);
  const totalAllocated = teamMembers.reduce((sum, m) => sum + m.allocated, 0);
  const avgUtilization = (totalAllocated / totalCapacity) * 100;
  const aiProficient = teamMembers.filter(m => m.aiProficiency === 'expert' || m.aiProficiency === 'advanced').length;

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: t`${bold(fg('#00FF00')('👥 TEAM ANALYTICS'))}  ${fg('#888888')('Productivity, capacity, and AI adoption insights')}`,
      }),
      Text({ content: `${teamMembers.length} team members • ${totalCapacity}h total capacity`, fg: '#888888' })
    ),

    Divider(),

    Box(
      { flexDirection: 'row', gap: 1 },
      MetricCard({
        title: 'Team Velocity',
        value: `${productivityMetrics.sprintVelocity} pts/sprint`,
        trend: 'Stable ↗',
        trendUp: true,
        icon: '⚡',
        color: '#00FF00',
        width: '20%',
      }),
      MetricCard({
        title: 'Capacity Used',
        value: `${avgUtilization.toFixed(0)}%`,
        trend: `${totalAllocated}h / ${totalCapacity}h`,
        trendUp: avgUtilization > 85,
        icon: '📊',
        color: avgUtilization > 85 ? '#FF0000' : avgUtilization > 70 ? '#FFAA00' : '#00FF00',
        width: '20%',
      }),
      MetricCard({
        title: 'AI Adoption',
        value: `${(productivityMetrics.aiAssistedRatio * 100).toFixed(0)}%`,
        trend: `${aiProficient}/${teamMembers.length} proficient`,
        trendUp: true,
        icon: '🤖',
        color: '#AA00FF',
        width: '20%',
      }),
      MetricCard({
        title: 'Cycle Time',
        value: `${productivityMetrics.cycleTime}d`,
        trend: `Deploy: ${productivityMetrics.deploymentFrequency}/wk`,
        trendUp: false,
        icon: '🔄',
        color: '#00AAFF',
        width: '20%',
      }),
      MetricCard({
        title: 'Satisfaction',
        value: `${productivityMetrics.teamSatisfaction}/5.0`,
        trend: 'Defect rate: 8%',
        trendUp: productivityMetrics.defectRate < 0.1,
        icon: '😊',
        color: productivityMetrics.teamSatisfaction >= 4 ? '#00FF00' : '#FFAA00',
        width: '20%',
      })
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '👤 Team Members',
        width: '40%',
        flexGrow: 1,
        borderColor: '#00FF00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...teamMembers.map(member => {
            const utilization = (member.allocated / member.capacity) * 100;
            const aiTasks = aiAgentTasks.filter(t => t.assignedTo === member.id).length;
            const utilColor = utilization > 90 ? '#FF0000' : utilization > 70 ? '#FFAA00' : '#00FF00';
            const profColor = getProficiencyColor(member.aiProficiency);
            return Box({ flexDirection: 'column', gap: 0, paddingBottom: 1 },
              Box({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                Box({ flexDirection: 'row', gap: 1, alignItems: 'center' },
                  Text({ content: `${member.avatar} ${member.name}`, fg: '#FFFFFF', attributes: 1 }),
                  Text({ content: `${getRoleIcon(member.role)} ${member.role}`, fg: '#888888' })
                ),
                Text({ content: `${utilization.toFixed(0)}%`, fg: utilColor, attributes: 1 })
              ),
              ProgressBar({ progress: utilization, width: '100%', color: utilColor, showPercent: false }),
              Box({ flexDirection: 'row', gap: 2, marginTop: 1 },
                Text({ content: `AI: ${member.aiProficiency.toUpperCase()}`, fg: profColor }),
                Text({ content: `Velocity: ${member.velocity} pts`, fg: '#00AAFF', attributes: 1 }),
                Text({ content: `AI Tasks: ${aiTasks}`, fg: '#AA00FF', attributes: 1 })
              )
            );
          })
        )
      ),

      Panel({
        title: '📈 Productivity Trends',
        width: '35%',
        flexGrow: 1,
        borderColor: '#00AAFF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'Velocity (Last 10 Sprints)', fg: '#00FFFF', attributes: 1 }),
            Box({ height: 8 },
              Text({ content: sparkline([32, 35, 31, 38, 34, 39, 36, 41, 37, 38], 40), fg: '#00AAFF' }),
              Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            )
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'AI-Assisted Ratio (Last 10 Sprints)', fg: '#00FFFF', attributes: 1 }),
            Box({ height: 8 },
              Text({ content: sparkline([0.45, 0.52, 0.48, 0.55, 0.58, 0.62, 0.60, 0.65, 0.67, 0.67].map(v => v * 100), 40), fg: '#AA00FF' }),
              Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            )
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'Code Review Time (Hours)', fg: '#00FFFF', attributes: 1 }),
            Box({ height: 8 },
              Text({ content: sparkline([4.2, 3.8, 3.5, 3.2, 2.9, 2.7, 2.5, 2.4, 2.3, 2.3].map(v => v * 10), 40), fg: '#00FF00' }),
              Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            )
          )
        )
      ),

      Panel({
        title: '🛠️ AI Tool Adoption',
        width: '25%',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...Object.entries(productivityMetrics.aiToolAdoption)
            .sort(([,a], [,b]) => b - a)
            .map(([tool, adoption]) => {
              const pct = adoption * 100;
              const color = pct > 80 ? '#00FF00' : pct > 50 ? '#FFAA00' : '#FF0000';
              return Box({ flexDirection: 'column', gap: 0 },
                Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: tool, fg: '#FFFFFF' }),
                  Text({ content: `${pct.toFixed(0)}%`, fg: color, attributes: 1 })
                ),
                ProgressBar({ progress: pct, width: '100%', color, showPercent: false })
              );
            })
        )
      )
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '🎯 Skill Matrix',
        width: '50%',
        flexGrow: 1,
        borderColor: '#FFAA00',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Text({ content: 'AI Proficiency by Role', fg: '#FFAA00', attributes: 1 }),
          Divider('#333333'),
          Box({ flexDirection: 'row', flexWrap: 'wrap', gap: 1 },
            ...['prompt-engineering', 'code-review', 'test-gen', 'model-eval', 'rag-optimization', 'fine-tuning'].map(skill => {
              const experts = teamMembers.filter(m => m.aiProficiency === 'expert').length;
              const advanced = teamMembers.filter(m => m.aiProficiency === 'advanced').length;
              return Box({ 
                flexDirection: 'column', 
                padding: 1, 
                backgroundColor: '#1E1E2E', 
                borderStyle: 'rounded', 
                borderColor: '#333333',
                width: '30%'
              },
                Text({ content: skill, fg: '#FFAA00', attributes: 1 }),
                Text({ content: `🟢 ${experts} expert`, fg: '#00FF00' }),
                Text({ content: `🔵 ${advanced} advanced`, fg: '#00AAFF' }),
                Text({ content: `🟡 ${teamMembers.length - experts - advanced} learning`, fg: '#FFAA00' })
              );
            })
          )
        )
      ),

      Panel({
        title: '⚠️ Capacity Alerts',
        width: '50%',
        flexGrow: 1,
        borderColor: '#FF0000',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          ...teamMembers
            .filter(m => m.allocated / m.capacity > 0.85)
            .map(member => {
              const utilization = (member.allocated / member.capacity) * 100;
              const borderCol = utilization > 100 ? '#FF0000' : '#FFAA00';
              return Box({ 
                flexDirection: 'column', 
                padding: 1, 
                backgroundColor: '#331111', 
                borderStyle: 'rounded', 
                borderColor: borderCol
              },
                Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: `${member.avatar} ${member.name} (${member.role})`, fg: '#FFFFFF', attributes: 1 }),
                  Text({ content: `${utilization.toFixed(0)}% OVERCAPACITY`, fg: borderCol, attributes: 1 })
                ),
                Text({ content: `Allocated: ${member.allocated}h / Capacity: ${member.capacity}h`, fg: '#FFAAAA' }),
                Text({ content: `Current sprint: ${member.currentSprintPoints} pts • Velocity: ${member.velocity} pts`, fg: '#FFAAAA' }),
                Text({ content: 'Action: Redistribute tasks or extend sprint', fg: '#AAAAAA' })
              );
            }),
          teamMembers.every(m => m.allocated / m.capacity <= 0.85) && 
            Text({ content: '✓ All team members within healthy capacity range', fg: '#00FF00' })
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1 },
      Text({ content: 'Velocity trend: ↗ +12% QoQ • AI adoption: ↗ +22% QoQ • Satisfaction: → Stable', fg: '#666666' }),
      Text({ content: '[1-7] Switch views  [R] Refresh  [Esc] Back', fg: '#666666' })
    )
  );
}