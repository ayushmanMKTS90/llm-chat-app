import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { getRelativeTime, truncate } from '../utils/formatters';
import { Panel, Divider, StatusBadge, Spacer } from '../components/ui';

export function CommunicationHubView(renderer: any, selectedIndex: number = 0, onSelect: (index: number) => void) {
  const updates = dataService.getStakeholderUpdates();
  const activeSprint = dataService.getActiveSprint();
  const tasks = dataService.getTasks(activeSprint?.id);
  const risks = dataService.getRisks();
  
  const aiGenerated = updates.filter(u => u.generatedBy === 'ai').length;
  const pendingSends = updates.filter(u => !u.sentAt).length;

  return Box(
    { flexDirection: 'row', gap: 1, width: '100%', height: '100%', padding: 1, flexGrow: 1 },
    
    Panel({
      title: '📬 Stakeholder Updates',
      width: '40%',
      flexGrow: 1,
      borderColor: '#00FFFF',
    },
      Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
        Box({ flexDirection: 'row', justifyContent: 'space-between' },
          Text({ content: `Updates (${updates.length})`, fg: '#FFFFFF', attributes: 1 }),
          Box({ flexDirection: 'row', gap: 1 },
            Text({ content: `🤖 ${aiGenerated} AI`, fg: '#AA00FF' }),
            Text({ content: `👤 ${updates.length - aiGenerated} Human`, fg: '#FFFFFF' }),
          )
        ),
        Divider('#333333'),
        ...updates.slice(0, 10).map((update, index) => {
          const isSelected = index === selectedIndex;
          const titleColor = isSelected ? '#00FFFF' : '#FFFFFF';
          return Box(
            {
              flexDirection: 'column',
              gap: 0,
              padding: 1,
              backgroundColor: isSelected ? '#3A3A5E' : (index % 2 === 0 ? '#1E1E2E' : '#1A1A2E'),
              borderStyle: 'rounded',
              borderColor: isSelected ? '#00FFFF' : '#333333',
              onMouseDown: () => onSelect(index),
            },
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: truncate(update.title, 30), fg: titleColor, attributes: 1 }),
              Box({ flexDirection: 'row', gap: 1 },
                update.generatedBy === 'ai' && Text({ content: '🤖', fg: '#AA00FF' }),
                StatusBadge({ text: update.audience.toUpperCase(), color: '#00AAFF', bgColor: '#001122' })
              )
            ),
            Text({ content: truncate(update.summary, 80), fg: '#888888' }),
            Box({ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 },
              Text({ content: update.channel.toUpperCase(), fg: '#666666' }),
              Text({ content: getRelativeTime(update.createdAt), fg: '#666666' })
            ),
            update.sentAt && Text({ content: `✓ Sent ${getRelativeTime(update.sentAt)}`, fg: '#00FF00' })
          );
        }),
        updates.length > 10 && Text({ content: `... and ${updates.length - 10} more updates`, fg: '#666666' })
      )
    ),

    Box(
      { flexDirection: 'column', gap: 1, width: '60%', flexGrow: 1 },
      
      Panel({
        title: '✍️ Generate Update',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'row', gap: 2 },
            Text({ content: 'Audience:', fg: '#AA00FF', attributes: 1 }),
            Text({ content: 'Executive [1]', fg: '#FFFFFF' }),
            Text({ content: 'Team [2]', fg: '#FFFFFF' }),
            Text({ content: 'Client [3]', fg: '#FFFFFF' }),
            Text({ content: 'Cross-Functional [4]', fg: '#FFFFFF' }),
          ),
          Box({ flexDirection: 'row', gap: 2 },
            Text({ content: 'Channel:', fg: '#AA00FF', attributes: 1 }),
            Text({ content: 'Email [E]', fg: '#FFFFFF' }),
            Text({ content: 'Slack [S]', fg: '#FFFFFF' }),
            Text({ content: 'Notion [N]', fg: '#FFFFFF' }),
            Text({ content: 'Confluence [C]', fg: '#FFFFFF' }),
          ),
          Divider('#333333'),
          Text({ content: 'AI-Generated Preview:', fg: '#AA00FF', attributes: 1 }),
          Box({ flexDirection: 'column', gap: 0, padding: 1, backgroundColor: '#1A1A2E', borderStyle: 'rounded', borderColor: '#333333', flexGrow: 1 },
            generateAIUpdatePreview(activeSprint, tasks, risks)
          ),
          Box({ flexDirection: 'row', gap: 2, marginTop: 1 },
            Text({ content: '[G] Generate & Send  [E] Edit First  [R] Regenerate  [X] Cancel', fg: '#00FF00' })
          )
        )
      ),

      Panel({
        title: '📊 Communication Metrics',
        borderColor: '#00FF00',
      },
        Box({ flexDirection: 'column', gap: 1 },
          Box({ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
            Text({ content: `This Week: ${updates.filter(u => (Date.now() - u.createdAt.getTime()) < 7 * 86400000).length} updates`, fg: '#FFFFFF', attributes: 1 }),
            Text({ content: `AI Ratio: ${((aiGenerated / updates.length) * 100).toFixed(0)}%`, fg: '#AA00FF', attributes: 1 }),
            Text({ content: `Avg Length: ${Math.round(updates.reduce((a, b) => a + b.summary.length, 0) / updates.length)} chars`, fg: '#FFFFFF', attributes: 1 }),
            Text({ content: `Sent: ${updates.filter(u => u.sentAt).length}/${updates.length}`, fg: '#00FF00', attributes: 1 })
          ),
          Divider('#333333'),
          Box({ flexDirection: 'row', justifyContent: 'space-between' },
            Text({ content: 'By Audience', fg: '#00FFFF', attributes: 1 }),
            Text({ content: 'By Channel', fg: '#00FFFF', attributes: 1 })
          ),
          Box({ flexDirection: 'row', gap: 2 },
            Box({ flexDirection: 'column', gap: 0, width: '50%' },
              ...['executive', 'team', 'client', 'cross-functional'].map(audience => {
                const count = updates.filter(u => u.audience === audience).length;
                return Text({ content: `${audience.padEnd(18)} ${count}`, fg: '#FFAA00', attributes: 1 });
              })
            ),
            Box({ flexDirection: 'column', gap: 0, width: '50%' },
              ...['email', 'slack', 'notion', 'confluence'].map(channel => {
                const count = updates.filter(u => u.channel === channel).length;
                return Text({ content: `${channel.padEnd(18)} ${count}`, fg: '#FFAA00', attributes: 1 });
              })
            )
          )
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1, marginTop: 1 },
      Text({ content: '↑/↓ Select update  [Enter] View full  [G] Generate  [T] Templates  [Esc] Back', fg: '#666666' }),
      Text({ content: 'AI-generated updates save ~2h/week • Review before sending', fg: '#666666' })
    )
  );
}

function generateAIUpdatePreview(sprint: any, tasks: any[], risks: any[]): any[] {
  if (!sprint) {
    return [Text({ content: 'No active sprint to generate update for', fg: '#666666' })];
  }

  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const inReview = tasks.filter(t => t.status === 'in-review').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  const criticalRisks = risks.filter(r => r.impact === 'critical' && r.status !== 'resolved').length;
  const progress = ((sprint.completedPoints / sprint.storyPoints) * 100).toFixed(0);

  const previewLines = [
    `Sprint ${sprint.name.split(' ')[1]} Update - ${new Date().toLocaleDateString()}`,
    '',
    `Progress: ${progress}% (${sprint.completedPoints}/${sprint.storyPoints} pts)`,
    `In Progress: ${inProgress} | In Review: ${inReview} | Blocked: ${blocked}`,
    `Critical Risks: ${criticalRisks}`,
    '',
    'Key Achievements:',
    '• AI Code Review Agent 70% complete',
    '• Prompt Engineering Standards in review',
    '• RAG Pipeline optimization on track',
    '',
    'Blockers:',
    '• Security audit model timeout (retrying with smaller batches)',
    '• Waiting on stakeholder approval for model eval pipeline',
    '',
    'Next Week Focus:',
    '• Complete AI Code Review Agent deployment',
    '• Launch Model Evaluation Dashboard beta',
    '• Begin Sprint 24 planning',
  ];

  return previewLines.map(line => {
    let fgColor = '#AAAAAA';
    let attributes = 0;
    if (line.startsWith('•') || line.startsWith('Sprint') || line.startsWith('Progress')) {
      fgColor = '#00FFFF';
    } else if (line.startsWith('Key') || line.startsWith('Blockers') || line.startsWith('Next')) {
      fgColor = '#FFAA00';
      attributes = 1;
    }
    return Text({ content: line, fg: fgColor, attributes });
  });
}