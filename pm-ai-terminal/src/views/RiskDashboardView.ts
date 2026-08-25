import { Box, Text, t, bold, fg } from '@opentui/core';
import { dataService } from '../services/dataService';
import { getRelativeTime, getStatusColor, getPriorityColor, truncate, sparkline } from '../utils/formatters';
import { Panel, Divider, StatusBadge, ProgressBar } from '../components/ui';

export function RiskDashboardView(renderer: any, selectedIndex: number = 0, onSelect: (index: number) => void) {
  const risks = dataService.getRisks();
  const activeSprint = dataService.getActiveSprint();
  
  const risksByStatus = {
    identified: risks.filter(r => r.status === 'identified'),
    analyzing: risks.filter(r => r.status === 'analyzing'),
    mitigating: risks.filter(r => r.status === 'mitigating'),
    monitoring: risks.filter(r => r.status === 'monitoring'),
    resolved: risks.filter(r => r.status === 'resolved'),
  };

  const criticalRisks = risks.filter(r => r.impact === 'critical' && r.status !== 'resolved').length;
  const highRisks = risks.filter(r => r.impact === 'high' && r.status !== 'resolved').length;
  const aiDetected = risks.filter(r => r.aiDetected && r.status !== 'resolved').length;

  return Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },
    
    Box(
      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 3 },
      Text({
        content: '⚠️ RISK DASHBOARD  Identify, track, and mitigate project risks',
        fg: '#FF0000',
        attributes: 1,
      }),
      Box({ flexDirection: 'row', gap: 2 },
        Text({ content: `🔴 ${criticalRisks} critical`, fg: '#FF0000' }),
        Text({ content: `🟠 ${highRisks} high`, fg: '#FFAA00' }),
        Text({ content: `🤖 ${aiDetected} AI-detected`, fg: '#AA00FF' }),
        Text({ content: `✓ ${risksByStatus.resolved.length} resolved`, fg: '#00FF00' }),
      )
    ),

    Divider(),

    Box(
      { flexDirection: 'row', gap: 1 },
      Panel({
        title: '🎯 Risk Heat Map',
        width: '35%',
        flexGrow: 1,
        borderColor: '#FF0000',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Text({ content: 'Probability →', fg: '#FFFFFF', attributes: 1 }),
          Box({ flexDirection: 'column', gap: 0 },
            ...['very-high', 'high', 'medium', 'low'].map((prob, pIdx) => {
              const probColor = getPriorityColor(prob);
              return Box({ flexDirection: 'row', gap: 0 },
                Box({ width: 12, alignItems: 'center' },
                  Text({ content: prob.toUpperCase().padEnd(10), fg: probColor })
                ),
                ...['critical', 'high', 'medium', 'low'].map((impact, iIdx) => {
                  const impactColor = getPriorityColor(impact);
                  const count = risks.filter(r => 
                    r.probability === prob && r.impact === impact && r.status !== 'resolved'
                  ).length;
                  return Box({ 
                    width: 8, 
                    alignItems: 'center',
                    backgroundColor: count > 0 ? `${probColor}${impactColor}33` : '#1A1A2E',
                    borderStyle: 'single',
                    borderColor: count > 0 ? probColor : '#333333',
                  },
                    Text({ content: count > 0 ? String(count) : '·', fg: count > 2 ? '#FF0000' : '#FFAA00', attributes: 1 })
                  );
                })
              );
            })
          ),
          Box({ flexDirection: 'row', gap: 1, marginTop: 1 },
            ...['critical', 'high', 'medium', 'low'].map(impact => 
              Box({ width: 8, alignItems: 'center' },
                Text({ content: impact.substring(0, 4).padEnd(6), fg: getPriorityColor(impact) })
              )
            )
          )
        )
      ),

      Panel({
        title: '📋 Risk Register',
        width: '65%',
        flexGrow: 1,
        borderColor: '#FFAA00',
      },
        Box({ flexDirection: 'column', gap: 0, flexGrow: 1 },
          Box({ flexDirection: 'row', backgroundColor: '#2A2A3E', paddingLeft: 1, paddingRight: 1 },
            Text({ content: 'Risk'.padEnd(28), fg: '#FFAA00', attributes: 1, width: 28 }),
            Text({ content: 'Category'.padEnd(14), fg: '#FFAA00', attributes: 1, width: 14 }),
            Text({ content: 'Prob'.padEnd(8), fg: '#FFAA00', attributes: 1, width: 8 }),
            Text({ content: 'Impact'.padEnd(8), fg: '#FFAA00', attributes: 1, width: 8 }),
            Text({ content: 'Status'.padEnd(12), fg: '#FFAA00', attributes: 1, width: 12 }),
            Text({ content: 'Owner'.padEnd(14), fg: '#FFAA00', attributes: 1, width: 14 }),
            Text({ content: 'Detected', fg: '#FFAA00', attributes: 1, width: 12 }),
          ),
          ...risks.filter(r => r.status !== 'resolved').map((risk, index) => {
            const globalIndex = risks.indexOf(risk);
            const isSelected = globalIndex === selectedIndex;
            return Box(
              {
                flexDirection: 'row',
                backgroundColor: isSelected ? '#3A3A5E' : (index % 2 === 0 ? '#1E1E2E' : '#1A1A2E'),
                paddingLeft: 1,
                paddingRight: 1,
                onMouseDown: () => onSelect(globalIndex),
              },
              Text({ content: truncate(risk.title, 28).padEnd(28), fg: isSelected ? '#FFAA00' : '#FFFFFF', width: 28 }),
              Text({ content: risk.category.padEnd(14), fg: isSelected ? '#FFAA00' : '#888888', width: 14 }),
              Text({ content: risk.probability.padEnd(8), fg: getPriorityColor(risk.probability), width: 8 }),
              Text({ content: risk.impact.padEnd(8), fg: getPriorityColor(risk.impact), width: 8 }),
              Text({ content: risk.status.toUpperCase().padEnd(12), fg: getStatusColor(risk.status), width: 12 }),
              Text({ content: risk.owner.padEnd(14), fg: isSelected ? '#FFAA00' : '#AAAAAA', width: 14 }),
              Text({ content: getRelativeTime(risk.detectedAt).padEnd(12), fg: '#666666', width: 12 }),
            )
          }),
          risksByStatus.resolved.length > 0 && Box({ flexDirection: 'column', marginTop: 1 },
            Divider('#333333'),
            Text({ content: `Resolved Risks (${risksByStatus.resolved.length})`, fg: '#666666' }),
            ...risksByStatus.resolved.slice(0, 3).map((risk, index) =>
              Box({ flexDirection: 'row', paddingLeft: 1, paddingRight: 1, paddingTop: 1 },
                Text({ content: truncate(risk.title, 28).padEnd(28), fg: '#666666', width: 28 }),
                Text({ content: 'RESOLVED', fg: '#00FF00', width: 12 }),
                Text({ content: risk.mitigation || 'No mitigation recorded', fg: '#666666' })
              )
            )
          )
        )
      )
    ),

    Box(
      { flexDirection: 'row', gap: 1, flexGrow: 1 },
      
      Panel({
        title: '🔍 Selected Risk Detail',
        width: '50%',
        flexGrow: 1,
        borderColor: '#444444',
      },
        risks.length > 0 ? (() => {
          const risk = risks[selectedIndex];
          return Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: risk.title, fg: '#FFFFFF', attributes: 1 }),
              Box({ flexDirection: 'row', gap: 1 },
                StatusBadge({ text: risk.category.toUpperCase(), color: '#00AAFF' }),
                StatusBadge({ text: risk.probability.toUpperCase(), color: getPriorityColor(risk.probability) }),
                StatusBadge({ text: risk.impact.toUpperCase(), color: getPriorityColor(risk.impact) }),
                risk.aiDetected && StatusBadge({ text: 'AI-DETECTED', color: '#AA00FF' })
              )
            ),
            Divider('#333333'),
            Text({ content: 'Description:', fg: '#888888' }),
            Text({ content: risk.description, fg: '#AAAAAA' }),
            Divider('#333333'),
            Box({ flexDirection: 'row', gap: 2 },
              Box({ flexDirection: 'column', gap: 0 },
                Text({ content: `Status: ${risk.status.toUpperCase()}`, fg: getStatusColor(risk.status) }),
                Text({ content: `Owner: ${risk.owner}`, fg: '#FFFFFF' }),
                Text({ content: `Detected: ${getRelativeTime(risk.detectedAt)}`, fg: '#AAAAAA' }),
              ),
              Box({ flexDirection: 'column', gap: 0 },
                Text({ content: `Probability: ${risk.probability.toUpperCase()}`, fg: getPriorityColor(risk.probability) }),
                Text({ content: `Impact: ${risk.impact.toUpperCase()}`, fg: getPriorityColor(risk.impact) }),
                Text({ content: `Sprint: ${activeSprint?.name || 'N/A'}`, fg: '#AAAAAA' }),
              )
            ),
            risk.mitigation && Box({ flexDirection: 'column', gap: 0, padding: 1, backgroundColor: '#113311', borderStyle: 'rounded', borderColor: '#00FF00' },
              Text({ content: '🛡️ Mitigation Strategy:', fg: '#00FF00', attributes: 1 }),
              Text({ content: risk.mitigation, fg: '#AAFFAA' })
            ),
            !risk.mitigation && risk.status !== 'resolved' && Box({ flexDirection: 'column', gap: 0, padding: 1, backgroundColor: '#333311', borderStyle: 'rounded', borderColor: '#FFAA00' },
              Text({ content: '⚠ No mitigation strategy defined', fg: '#FFAA00', attributes: 1 }),
              Text({ content: 'Add mitigation plan to reduce risk exposure', fg: '#FFFFAA' })
            )
          );
        })() : Text({ content: 'No risks to display', fg: '#666666' })
      ),

      Panel({
        title: '📊 Risk Analytics',
        width: '50%',
        flexGrow: 1,
        borderColor: '#AA00FF',
      },
        Box({ flexDirection: 'column', gap: 1, flexGrow: 1 },
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'Risks by Category', fg: '#AA00FF', attributes: 1 }),
            ...Object.entries(risks.reduce((acc, r) => {
              acc[r.category] = (acc[r.category] || 0) + 1;
              return acc;
            }, {} as Record<string, number>))
              .sort(([,a], [,b]) => b - a)
              .map(([category, count]) => {
                const pct = (count / risks.length) * 100;
                return Box({ flexDirection: 'row', justifyContent: 'space-between' },
                  Text({ content: category, fg: '#FFFFFF' }),
                  Text({ content: `${count} (${pct.toFixed(0)}%)`, fg: '#FFAA00', attributes: 1 })
                );
              })
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'Risk Trend', fg: '#AA00FF', attributes: 1 }),
            Text({ content: 'New risks this sprint: 3  •  Resolved: 1  •  Escalated: 0', fg: '#888888' }),
            Box({ height: 6 },
              Text({ content: sparkline([8, 9, 8, 7, 7, 8, 9, 10, 9, 8], 40), fg: '#FFAA00' }),
              Text({ content: '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁', fg: '#666666' }),
            )
          ),
          Divider('#333333'),
          Box({ flexDirection: 'column', gap: 1 },
            Text({ content: 'AI Detection Accuracy', fg: '#AA00FF', attributes: 1 }),
            Text({ content: 'True positives: 7/9  •  False positives: 2  •  Missed: 1', fg: '#888888' }),
            ProgressBar({ progress: 78, width: '100%', color: '#AA00FF' }),
            Text({ content: 'Model confidence threshold: 0.75  •  Retraining scheduled: Jan 20', fg: '#888888' })
          )
        )
      )
    ),

    Box(
      { flexDirection: 'row', justifyContent: 'space-between', height: 1 },
      Text({ content: `Total risks: ${risks.length}  •  Active: ${risks.filter(r => r.status !== 'resolved').length}  •  Press [N] New Risk  [M] Mitigate  [Enter] Details`, fg: '#666666' }),
      Text({ content: '[A] AI Scan  [E] Export  [Esc] Back', fg: '#666666' })
    )
  );
}