import { Sprint, Task, AIAgentTask, TeamMember, AICostMetrics, ProductivityMetrics, RiskItem, StakeholderUpdate } from '../data/models';
import { mockSprints, mockTasks, mockAIAgentTasks, mockTeamMembers, mockAICostMetrics, mockProductivityMetrics, mockRisks, mockStakeholderUpdates } from '../data/mockData';

class DataService {
  private sprints: Sprint[] = [...mockSprints];
  private tasks: Task[] = [...mockTasks];
  private aiAgentTasks: AIAgentTask[] = [...mockAIAgentTasks];
  private teamMembers: TeamMember[] = [...mockTeamMembers];
  private costMetrics: AICostMetrics = { ...mockAICostMetrics };
  private productivityMetrics: ProductivityMetrics = { ...mockProductivityMetrics };
  private risks: RiskItem[] = [...mockRisks];
  private stakeholderUpdates: StakeholderUpdate[] = [...mockStakeholderUpdates];

  getSprints(): Sprint[] {
    return this.sprints;
  }

  getActiveSprint(): Sprint | undefined {
    return this.sprints.find(s => s.status === 'active');
  }

  getTasks(sprintId?: string): Task[] {
    if (sprintId) {
      return this.tasks.filter(t => t.sprintId === sprintId);
    }
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  getAIAgentTasks(): AIAgentTask[] {
    return this.aiAgentTasks;
  }

  getAIAgentTasksByAssignee(assignee: string): AIAgentTask[] {
    return this.aiAgentTasks.filter(t => t.assignedTo === assignee);
  }

  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  getTeamMemberById(id: string): TeamMember | undefined {
    return this.teamMembers.find(m => m.id === id);
  }

  getCostMetrics(): AICostMetrics {
    return this.costMetrics;
  }

  getProductivityMetrics(): ProductivityMetrics {
    return this.productivityMetrics;
  }

  getRisks(): RiskItem[] {
    return this.risks;
  }

  getStakeholderUpdates(): StakeholderUpdate[] {
    return this.stakeholderUpdates;
  }

  updateAIAgentTaskProgress(id: string, progress: number, status?: AIAgentTask['status']): void {
    const task = this.aiAgentTasks.find(t => t.id === id);
    if (task) {
      task.progress = progress;
      if (status) task.status = status;
      if (progress === 100 && !task.completedAt) {
        task.completedAt = new Date();
      }
    }
  }

  updateTaskStatus(id: string, status: Task['status']): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      task.updatedAt = new Date();
    }
  }

  addStakeholderUpdate(update: Omit<StakeholderUpdate, 'id' | 'createdAt'>): StakeholderUpdate {
    const newUpdate: StakeholderUpdate = {
      ...update,
      id: `update-${Date.now()}`,
      createdAt: new Date(),
    };
    this.stakeholderUpdates.unshift(newUpdate);
    return newUpdate;
  }
}

export const dataService = new DataService();