import { defineStore } from 'pinia';

export interface DeploymentStep {
  id: string;
  stage: string;
  taskTitle: string;
  requiredTime: number;
  taskDescription: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  status: string;
  responsibleTeam: string;
  allocatedPerson: string;
  comments: string;
}

export const useDeploymentStore = defineStore('deploymentPlan', {
  state: () => ({
    steps: [
      // Use DeploymentStep[] for type safety
    ] as DeploymentStep[]
  }),
  actions: {
    addStep(newStep: DeploymentStep) {
      this.steps.push(newStep);
    },
    updateStep(index: number, updatedStep: Partial<DeploymentStep>) {
      this.steps[index] = { ...this.steps[index], ...updatedStep };
    },
    resetSteps() {
      this.steps = [];
    },
    removeStep(index: number) {
      this.steps.splice(index, 1);
    }
  }
});
