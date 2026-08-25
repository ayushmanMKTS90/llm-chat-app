export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  status: 'planning' | 'active' | 'review' | 'done';
  storyPoints: number;
  completedPoints: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'bug' | 'tech-debt' | 'ai-research' | 'prompt-engineering' | 'model-eval';
  status: 'backlog' | 'ready' | 'in-progress' | 'in-review' | 'done' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  storyPoints: number;
  assignee: string;
  sprintId?: string;
  aiAssisted: boolean;
  aiToolUsed?: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAgentTask {
  id: string;
  name: string;
  description: string;
  agentType: 'code-gen' | 'code-review' | 'test-gen' | 'doc-gen' | 'refactor' | 'security-audit' | 'perf-analysis';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'needs-review';
  progress: number;
  assignedTo: string;
  model: string;
  tokensUsed: number;
  cost: number;
  startedAt?: Date;
  completedAt?: Date;
  result?: string;
  error?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'pm' | 'tech-lead' | 'senior-dev' | 'dev' | 'qa' | 'designer' | 'data-scientist' | 'ml-engineer';
  avatar: string;
  capacity: number;
  allocated: number;
  aiProficiency: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  currentSprintPoints: number;
  velocity: number;
}

export interface AICostMetrics {
  totalCost: number;
  dailyCost: number;
  monthlyBudget: number;
  byModel: Record<string, { cost: number; tokens: number; requests: number }>;
  byAgentType: Record<string, { cost: number; tasks: number }>;
  byTeamMember: Record<string, { cost: number; tasks: number }>;
  trend: Array<{ date: string; cost: number }>;
}

export interface ProductivityMetrics {
  sprintVelocity: number;
  aiAssistedRatio: number;
  codeReviewTime: number;
  deploymentFrequency: number;
  defectRate: number;
  cycleTime: number;
  aiToolAdoption: Record<string, number>;
  teamSatisfaction: number;
}

export interface RiskItem {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'schedule' | 'resource' | 'ai-model' | 'security' | 'compliance';
  probability: 'very-high' | 'high' | 'medium' | 'low';
  impact: 'critical' | 'high' | 'medium' | 'low';
  status: 'identified' | 'analyzing' | 'mitigating' | 'monitoring' | 'resolved';
  aiDetected: boolean;
  mitigation?: string;
  owner: string;
  detectedAt: Date;
}

export interface StakeholderUpdate {
  id: string;
  title: string;
  summary: string;
  audience: 'executive' | 'team' | 'client' | 'cross-functional';
  generatedBy: 'ai' | 'human';
  createdAt: Date;
  sentAt?: Date;
  channel: 'email' | 'slack' | 'notion' | 'confluence';
}