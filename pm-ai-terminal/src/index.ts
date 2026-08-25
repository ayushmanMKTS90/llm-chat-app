import { createCliRenderer, Box, Text, bold, fg } from '@opentui/core';

async function main() {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
  });

  const activeSprint = { name: "Sprint 23 - AI Integration", completedPoints: 42, storyPoints: 85 };
  const costMetrics = { totalCost: 1247.83, dailyCost: 47.23, monthlyBudget: 2000 };
  const aiAgentTasks = [
    { name: "PR #2341 Code Review", type: "code-review", status: "completed", progress: 100 },
    { name: "Generate Unit Tests - UserService", type: "test-gen", status: "running", progress: 65 },
    { name: "API Documentation - v2 Endpoints", type: "doc-gen", status: "needs-review", progress: 100 },
    { name: "Refactor Legacy Payment Module", type: "refactor", status: "pending", progress: 0 },
    { name: "Security Scan - AI Generated Code", type: "security-audit", status: "failed", progress: 40 },
    { name: "Performance Profile - RAG Pipeline", type: "perf-analysis", status: "running", progress: 30 },
  ];
  const risks = [
    { title: "AI Model Hallucination in Production Code", category: "ai-model", probability: "high", impact: "critical", status: "mitigating", aiDetected: true, owner: "Alex Chen" },
    { title: "Token Cost Overrun", category: "resource", probability: "medium", impact: "high", status: "analyzing", aiDetected: true, owner: "PM" },
    { title: "Team AI Skill Gap", category: "resource", probability: "high", impact: "medium", status: "monitoring", aiDetected: false, owner: "Sarah Kim" },
    { title: "Vendor Lock-in - Single Model Provider", category: "technical", probability: "medium", impact: "high", status: "identified", aiDetected: false, owner: "Elena Rodriguez" },
  ];
  const teamMembers = [
    { name: "Alex Chen", role: "Tech Lead", avatar: "👑", allocated: 32, capacity: 40 },
    { name: "Sarah Kim", role: "Senior Dev", avatar: "⭐", allocated: 28, capacity: 35 },
    { name: "Marcus Johnson", role: "Dev", avatar: "👨‍💻", allocated: 25, capacity: 30 },
    { name: "Priya Sharma", role: "QA", avatar: "🧪", allocated: 22, capacity: 30 },
  ];

  function getStatusColor(s: string) { return { completed: '#00FF00', running: '#00AAFF', pending: '#666666', failed: '#FF0000', 'needs-review': '#AA00FF', mitigating: '#FFAA00', analyzing: '#00AAFF', monitoring: '#00FFAA', identified: '#FFAA00' }[s] || '#FFF'; }
  function getPriorityColor(p: string) { return { 'very-high': '#FF0000', high: '#FFAA00', medium: '#00AAFF', low: '#888888' }[p] || '#FFF'; }
  function fmtCurrency(n: number) { return n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n.toFixed(2)}`; }
  function fmtNumber(n: number) { return n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : n.toString(); }

  const header = Box(
    { flexDirection: 'row', height: 1, backgroundColor: '#1A1A2E', borderStyle: 'single', borderColor: '#333333', paddingLeft: 1, paddingRight: 1 },
    Text({ content: 'PM AI Terminal v1.0', fg: '#00FFFF', attributes: 1 }),
    Text({ content: '[Q] Quit', fg: '#666666' })
  );

  const content = Box(
    { flexDirection: 'column', width: '100%', height: '100%', padding: 1, gap: 1 },

    // Title
    Box({ flexDirection: 'row', justifyContent: 'space-between', height: 2 },
      Text({ content: '📊 PM AI TERMINAL  Terminal as a Service • AI Era Project Manager', fg: '#00FFFF', attributes: 1 }),
      Text({ content: `Active Sprint: ${activeSprint.name}`, fg: '#FFAA00', attributes: 1 })
    ),

    // Divider
    Box({ height: 1, backgroundColor: '#444444' }),

    // Metric Cards
    Box({ flexDirection: 'row', gap: 2, height: 6 },
      Box({ borderStyle: 'rounded', borderColor: '#00AAFF', backgroundColor: '#1A1A2E', padding: 1, width: '25%', flexDirection: 'column', justifyContent: 'space-between' },
        Text({ content: 'Sprint Progress', fg: '#888888' }),
        Text({ content: '49%', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: '▲ +42/85 pts', fg: '#00FF00' }),
        Box({ height: 1, backgroundColor: '#00AAFF', width: '30%' })
      ),
      Box({ borderStyle: 'rounded', borderColor: '#FFAA00', backgroundColor: '#1A1A2E', padding: 1, width: '25%', flexDirection: 'column', justifyContent: 'space-between' },
        Text({ content: 'AI Cost (Month)', fg: '#888888' }),
        Text({ content: `$${(costMetrics.totalCost/1000).toFixed(1)}K`, fg: '#FFFFFF', attributes: 1 }),
        Text({ content: '▼ +$47.23/day', fg: '#FF0000' }),
        Box({ height: 1, backgroundColor: '#FFAA00', width: '30%' })
      ),
      Box({ borderStyle: 'rounded', borderColor: '#00FF00', backgroundColor: '#1A1A2E', padding: 1, width: '25%', flexDirection: 'column', justifyContent: 'space-between' },
        Text({ content: 'Team Velocity', fg: '#888888' }),
        Text({ content: '38 pts', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: '▲ 38 pts/sprint', fg: '#00FF00' }),
        Box({ height: 1, backgroundColor: '#00FF00', width: '30%' })
      ),
      Box({ borderStyle: 'rounded', borderColor: '#AA00FF', backgroundColor: '#1A1A2E', padding: 1, width: '25%', flexDirection: 'column', justifyContent: 'space-between' },
        Text({ content: 'AI Adoption', fg: '#888888' }),
        Text({ content: '67%', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: '▲ 67% AI-assisted', fg: '#AA00FF' }),
        Box({ height: 1, backgroundColor: '#AA00FF', width: '30%' })
      )
    ),

    // Top Row: Burndown + AI Agents
    Box({ flexDirection: 'row', gap: 2, flexGrow: 1 },
      // Burndown
      Box({ borderStyle: 'rounded', borderColor: '#00AAFF', backgroundColor: '#1A1A2E', padding: 1, width: '50%', flexDirection: 'column', gap: 1, flexGrow: 1 },
        Text({ content: '📈 Sprint Burndown', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: 'Story Points Remaining', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: `${activeSprint.storyPoints - activeSprint.completedPoints} / ${activeSprint.storyPoints}`, fg: '#00FF00', attributes: 1 }),
        Box({ width: '100%', height: 1, backgroundColor: '#333333' },
          Box({ width: '49%', height: 1, backgroundColor: '#00AAFF' })
        ),
        Text({ content: 'Daily burn rate: ~3.2 pts/day  Projected completion: Jan 18', fg: '#888888' }),
        Text({ content: '██████████████████░░░░░░░░░░░░░░░░', fg: '#00AAFF' }),
        Text({ content: 'Jan 6                                    Jan 19', fg: '#888888' })
      ),

      // AI Agents
      Box({ borderStyle: 'rounded', borderColor: '#AA00FF', backgroundColor: '#1A1A2E', padding: 1, width: '50%', flexDirection: 'column', gap: 1, flexGrow: 1 },
        Text({ content: '🤖 AI Agent Activity', fg: '#FFFFFF', attributes: 1 }),
        Text({ content: '2 active • 6 total', fg: '#00AAFF', attributes: 1 }),
        ...aiAgentTasks.slice(0, 5).map(task =>
          Box({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2, height: 1 },
            Box({ flexDirection: 'row', gap: 1, alignItems: 'center' },
              Text({ content: '●', fg: getStatusColor(task.status) }),
              Text({ content: task.name, fg: getStatusColor(task.status), width: 30 }),
              Text({ content: task.type, fg: '#888888', width: 15 })
            ),
            Box({ flexDirection: 'row', alignItems: 'center', gap: 2 },
              Box({ width: 15, height: 1, backgroundColor: '#333333' },
                Box({ width: `${Math.round(task.progress / 100 * 15)}`, height: 1, backgroundColor: getStatusColor(task.status) })
              ),
              Text({ content: task.status.toUpperCase(), fg: getStatusColor(task.status), width: 12 })
            )
          )
        )
      )
    ),

    // Bottom Row: Risks + Costs + Team
    Box({ flexDirection: 'row', gap: 2, flexGrow: 1 },
      // Risks
      Box({ borderStyle: 'rounded', borderColor: '#FF0000', backgroundColor: '#1A1A2E', padding: 1, width: '40%', flexDirection: 'column', gap: 1, flexGrow: 1 },
        Text({ content: '⚠️ Active Risks', fg: '#FFFFFF', attributes: 1 }),
        ...risks.filter(r => r.status !== 'resolved').slice(0, 4).map(risk =>
          Box({ flexDirection: 'column', gap: 0, paddingBottom: 1 },
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: risk.title, fg: '#FFFFFF', attributes: 1 }),
              Text({ content: risk.status.toUpperCase(), fg: getStatusColor(risk.status) })
            ),
            Text({ content: risk.category, fg: '#888888' }),
            Box({ flexDirection: 'row', gap: 1 },
              Text({ content: `■ ${risk.probability}`, fg: getPriorityColor(risk.probability) }),
              Text({ content: `■ ${risk.impact}`, fg: getPriorityColor(risk.impact) }),
              risk.aiDetected && Text({ content: '🤖 AI-detected', fg: '#AA00FF' })
            )
          )
        )
      ),

      // Costs
      Box({ borderStyle: 'rounded', borderColor: '#FFAA00', backgroundColor: '#1A1A2E', padding: 1, width: '35%', flexDirection: 'column', gap: 1, flexGrow: 1 },
        Text({ content: '💰 AI Cost Breakdown', fg: '#FFFFFF', attributes: 1 }),
        Box({ flexDirection: 'row', justifyContent: 'space-between' },
          Text({ content: 'Claude 3.5 Sonnet', fg: '#FFFFFF' }),
          Text({ content: '$523.41 (12.4M tokens)', fg: '#FFAA00', attributes: 1 })
        ),
        Box({ flexDirection: 'row', justifyContent: 'space-between' },
          Text({ content: 'GPT-4o', fg: '#FFFFFF' }),
          Text({ content: '$412.67 (9.8M tokens)', fg: '#FFAA00', attributes: 1 })
        ),
        Box({ flexDirection: 'row', justifyContent: 'space-between' },
          Text({ content: 'GPT-4', fg: '#FFFFFF' }),
          Text({ content: '$189.32 (3.2M tokens)', fg: '#FFAA00', attributes: 1 })
        ),
        Box({ height: 1, backgroundColor: '#333333' }),
        Box({ flexDirection: 'row', justifyContent: 'space-between' },
          Text({ content: 'Total', fg: '#FFFFFF', attributes: 1 }),
          Text({ content: '$1.2K / $2.0K', fg: '#FFAA00', attributes: 1 })
        ),
        Box({ width: '100%', height: 1, backgroundColor: '#333333' },
          Box({ width: '62%', height: 1, backgroundColor: '#FFAA00' })
        ),
        Text({ content: 'Daily: $47.23  Projection: $1.4K', fg: '#888888' })
      ),

      // Team
      Box({ borderStyle: 'rounded', borderColor: '#00FF00', backgroundColor: '#1A1A2E', padding: 1, width: '25%', flexDirection: 'column', gap: 1, flexGrow: 1 },
        Text({ content: '👥 Team Capacity', fg: '#FFFFFF', attributes: 1 }),
        ...teamMembers.map(m => {
          const pct = Math.round(m.allocated / m.capacity * 100);
          const color = pct > 90 ? '#FF0000' : pct > 70 ? '#FFAA00' : '#00FF00';
          return Box({ flexDirection: 'column', gap: 0 },
            Box({ flexDirection: 'row', justifyContent: 'space-between' },
              Text({ content: `${m.avatar} ${m.name}`, fg: '#FFFFFF' }),
              Text({ content: `${pct}%`, fg: color, attributes: 1 })
            ),
            Box({ width: '100%', height: 1, backgroundColor: '#333333' },
              Box({ width: `${pct}%`, height: 1, backgroundColor: color })
            )
          );
        })
      )
    )
  );

  const root = Box({ flexDirection: 'column', width: '100%', height: '100%' }, header, content);
  renderer.root.add(root);

  renderer.addInputHandler((seq: string) => {
    if (seq === 'q' || seq === '\x03') { renderer.destroy(); process.exit(0); return true; }
    return false;
  });

  renderer.start();
}

main().catch(e => { console.error(e); process.exit(1); });

function getStatusColor(s: string) { return { completed: '#00FF00', running: '#00AAFF', pending: '#666666', failed: '#FF0000', 'needs-review': '#AA00FF', mitigating: '#FFAA00', analyzing: '#00AAFF', monitoring: '#00FFAA', identified: '#FFAA00' }[s] || '#FFF'; }