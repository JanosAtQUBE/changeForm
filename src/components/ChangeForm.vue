<script lang="ts" setup>
import { reactive, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useDeploymentStore } from '../stores/deploymentPlan.ts';

const deploymentStore = useDeploymentStore();
const { steps } = storeToRefs(deploymentStore);

const computedStepsPrep = computed(() => {
  return steps.value.filter(step => step.stage === 'Preparation');
});

const computedStepsImplementation = computed(() => {
  return steps.value.filter(step => step.stage === 'Implementation');
});

const computedStepsVerification = computed(() => {
  return steps.value.filter(step => step.stage === 'Verification');
});

const computedStepsFinalization = computed(() => {
  return steps.value.filter(step => step.stage === 'Finalization');
});

const computedStepsRollback = computed(() => {
  return steps.value.filter(step => step.stage === 'Rollback');
});

type step = {
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
};

function addPreparationStep() {
  const newStep: step = {
    id: Date.now().toString(),
    stage: 'Preparation',
    taskTitle: '',
    requiredTime: 0,
    taskDescription: '',
    plannedStart: '',
    plannedEnd: '',
    actualStart: '',
    actualEnd: '',
    status: 'Open',
    responsibleTeam: '',
    allocatedPerson: '',
    comments: ''
  };
  deploymentStore.steps.push(newStep);
}

function addImplementationStep() {
  const newStep: step = {
    id: Date.now().toString(),
    stage: 'Implementation',
    taskTitle: '',
    requiredTime: 0,
    taskDescription: '',
    plannedStart: '',
    plannedEnd: '',
    actualStart: '',
    actualEnd: '',
    status: 'Open',
    responsibleTeam: '',
    allocatedPerson: '',
    comments: ''
  };
  deploymentStore.steps.push(newStep);
}

function addVerificationStep() {
  const newStep: step = {
    id: Date.now().toString(),
    stage: 'Verification',
    taskTitle: '',
    requiredTime: 0,
    taskDescription: '',
    plannedStart: '',
    plannedEnd: '',
    actualStart: '',
    actualEnd: '',
    status: 'Open',
    responsibleTeam: '',
    allocatedPerson: '',
    comments: ''
  };
  deploymentStore.steps.push(newStep);
}

function addFinalizationStep() {
  const newStep: step = {
    id: Date.now().toString(),
    stage: 'Finalization',
    taskTitle: '',
    requiredTime: 0,
    taskDescription: '',
    plannedStart: '',
    plannedEnd: '',
    actualStart: '',
    actualEnd: '',
    status: 'Open',
    responsibleTeam: '',
    allocatedPerson: '',
    comments: ''
  };
  deploymentStore.steps.push(newStep);
}

function addRollbackStep() {
  const newStep: step = {
    id: Date.now().toString(),
    stage: 'Rollback',
    taskTitle: '',
    requiredTime: 0,
    taskDescription: '',
    plannedStart: '',
    plannedEnd: '',
    actualStart: '',
    actualEnd: '',
    status: 'Open',
    responsibleTeam: '',
    allocatedPerson: '',
    comments: ''
  };
  deploymentStore.steps.push(newStep);
}

function removeStep(index: number, id: string) {
  deploymentStore.removeStep(steps.value.findIndex(step => step.id === id));
  deploymentStore.$patch({});
}

const complexityQuestions = {
  q1: 'Does the change impact more than one department?',
  q2: 'Will there be downtime or customer impact?',
  q3: 'Are legal/regulatory reviews needed?',
  q4: 'Is data privacy or security impacted?'
};

const form = reactive({
  ref: '',
  title: '',
  date: '',
  affectedServices: '',
  changeWindowStart: '',
  changeWindowEnd: '',
  complexityAnswers: {
    q1: 'no',
    q2: 'no',
    q3: 'no',
    q4: 'no'
  },
  complexityLevel: 'standard',
  summary: '',
  reason: '',
  benefits: '',
  departments: '',
  testPlan: '',
  rollback: '',
});

function moveStepUp(index: number) {
  if (index > 0) {
    const step = deploymentStore.steps[index];
    deploymentStore.steps.splice(index, 1);
    deploymentStore.steps.splice(index - 1, 0, step);
  }
}

function moveStepDown(index: number) {
  if (index < deploymentStore.steps.length - 1) {
    const step = deploymentStore.steps[index];
    deploymentStore.steps.splice(index, 1);
    deploymentStore.steps.splice(index + 1, 0, step);
  }
}

function submitForm() {
  console.log('Form submitted:', form);
  alert('Form submitted! Check console for data.');
}
</script>


<template>
  <form @submit.prevent="submitForm" class="">

    <!-- Section 1: Basic Information -->
    <div class="change-basic-info">
      <div class="change-basic-info--group">
        <div class="change-basic-info--left">
          <label for="change-ref" >Change Reference</label>
          <input id="change-ref" v-model="form.ref"  type="text" required />
        </div>
        <div class="change-basic-info--right">
          <label for="change-title" >Change Title</label>
          <input id="change-title" v-model="form.title"  type="text" required />
        </div>
      </div>
      <div class="change-affected-services">
        <label for="change-affected-services" >Affected Services</label>
        <input id="change-affected-services" v-model="form.affectedServices"  type="text" required />
      </div>
    </div>
    <div class="change-window--wrapper">
      <h4>Change window</h4>
      <!-- Change window -->
      <div class="change-window--details">
        <div class="change-window--detail">
          <label for="change-date" >Change Date</label>
          <input id="change-date" v-model="form.date"  type="date" required />
        </div>
        <div class="change-window--detail">
          <label for="change-window-start" class="block">Start</label>
          <input id="change-window-start" v-model="form.changeWindowStart"  type="time" required />
        </div>
        <div class="change-window--detail">
          <label for="change-window-end" class="block">End</label>
          <input id="change-window-end" v-model="form.changeWindowEnd"  type="time" required />
        </div>
      </div>

    </div>

    <!-- Section 2: Complexity Assessment -->
    <div>
      <h3 class="font-bold">Change Complexity Assessment</h3>
      <div v-for="(question, key) in complexityQuestions" :key="key">
        <label for="complexity-{{ key }}" class="block">{{ question }}</label>
        <select id="complexity-{{ key }}" v-model="form.complexityAnswers[key]" >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div>
        <label for="complexity-level" class="block font-semibold mt-2">Complexity Level:</label>
        <select id="complexity-level" v-model="form.complexityLevel" >
          <option value="standard">Standard</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <!-- Section 3: Change Description -->
    <!-- <div>
      <label>Summary of the Change</label>
      <textarea v-model="form.summary" ></textarea>
    </div>
    <div>
      <label>Reason for the Change</label>
      <textarea v-model="form.reason" ></textarea>
    </div>
    <div>
      <label>Expected Benefits</label>
      <textarea v-model="form.benefits" ></textarea>
    </div> -->

    <!-- Conditional Sections -->
    <template v-if="form.complexityLevel === 'high'">
      <div>
        <label>Affected Departments/Teams</label>
        <input v-model="form.departments"  />
      </div>
      <div>
        <label>Test Plan Summary</label>
        <textarea v-model="form.testPlan" ></textarea>
      </div>
      <div>
        <label>Rollback Strategy</label>
        <textarea v-model="form.rollback" ></textarea>
      </div>

      <!-- <div>
        <label>CAB Review Required?</label>
        <input type="checkbox" v-model="form.cabRequired" disabled checked />
      </div> -->

      <!-- Deployment plan -->

      <div class="deployment-plan">
        <h2>Deployment Plan</h2>
        <div class="deployment-plan--stage">
          <div class="deployment-plan--stage-title">
            <h3>1. Preparation Stage</h3>
          </div>
          <div class="deployment-plan--steps">
            <TransitionGroup name="deploymentstep" tag="ul">
              <li v-for="(step, index) in computedStepsPrep" :key="step.id" class="deployment-plan--step">
                <div class="deployment-plan--step-header">
                  <div class="deployment-plan--step-title">{{ step.stage }} - Step 1.{{ index + 1 }} </div>
                  <div class="deployment-plan--step-move">
                    <div class="deployment-plan--step-move-up">
                      <button type="button" @click="moveStepUp(index)" :disabled="index === 0">Move Up</button>
                    </div>
                    <div class="deployment-plan--step-move-down">
                      <button type="button" @click="moveStepDown(index)" :disabled="index === computedStepsPrep.length - 1">Move Down</button>
                    </div>
                  </div>
                </div>
                
                <div class="deployment-plan--step-wrapper">
                  <div class="deployment-plan--step-detail deployment-plan--task-title">
                    <label :for="`task-title-${index}`">Task Title</label>
                    <input :id="`task-title-${index}`" v-model="step.taskTitle" placeholder="Task" />
                  </div>
                  <div class="deployment-plan--step-detail">
                    <label :for="`required-time-${index}`">Required Time (min)</label>
                    <input :id="`required-time-${index}`" v-model.number="step.requiredTime" type="number" placeholder="Required Time (min)" />
                  </div>
                </div>
                <div class="deployment-plan--step-wrapper">
                  <div class="deployment-plan--step-detail">
                    <label :for="`task-description-${index}`">Task Description</label>
                    <textarea :id="`task-description-${index}`" v-model="step.taskDescription" placeholder="Task Description"></textarea>
                  </div>
                </div>
                <div class="deployment-plan--step-wrapper">
                  <div class="deployment-plan--step-detail">
                    <label :for="`planned-start-${index}`">Planned Start Time</label>
                    <input :id="`planned-start-${index}`" v-model="step.plannedStart" type="datetime-local" placeholder="Planned Start Time" />
                  </div>
                  <div class="deployment-plan--step-detail">
                    <label :for="`planned-end-${index}`">Planned End Time</label>
                    <input :id="`planned-end-${index}`" v-model="step.plannedEnd" type="datetime-local" placeholder="Planned End Time" />
                  </div>
                  <div class="deployment-plan--step-detail">
                    <label :for="`actual-start-${index}`">Actual Start Time</label>
                    <input :id="`actual-start-${index}`" v-model="step.actualStart" type="datetime-local" placeholder="Actual Start Time" disabled />
                  </div>
                  <div class="deployment-plan--step-detail">
                    <label :for="`actual-end-${index}`">Actual End Time</label>
                    <input :id="`actual-end-${index}`" v-model="step.actualEnd" type="datetime-local" placeholder="Actual End Time" disabled/>
                  </div>
                </div>
                <div class="deployment-plan--step-wrapper">
                  <div class="deployment-plan--step-detail">
                    <label :for="`status-${index}`">Status</label>
                    <select :id="`status-${index}`" v-model="step.status">
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div class="deployment-plan--step-detail">
                    <label :for="`allocated-person-${index}`">Allocated Person</label>
                    <input :id="`allocated-person-${index}`" v-model="step.allocatedPerson" placeholder="Allocated Person" />
                  </div>
                </div>
                <div class="deployment-plan--step-wrapper">
                  <div class="deployment-plan--step-detail">
                    <label :for="`comments-${index}`">Comments</label>
                    <textarea :id="`comments-${index}`" v-model="step.comments" placeholder="Comments"></textarea>
                  </div>
                </div>
                <div class="deployment-plan--step-actions">
                  <button type="button" @click="removeStep(index, step.id)">Remove Step</button>
                </div>
              </li>
            </TransitionGroup>

          </div>
          <!-- Add new step button -->
          <button type="button" @click="addPreparationStep">Add Step</button>
        </div>
        <div class="deployment-plan--stage">
          <div class="deployment-plan--stage-title">
            <h3>2. Implementation Stage</h3>
          </div>
          <div class="deployment-plan--steps">
            <div v-for="(step, index) in computedStepsImplementation" :key="index" class="deployment-plan--step">
              <div class="deployment-plan--step-title">{{ step.stage }} - Step 2.{{ index + 1 }}</div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail deployment-plan--task-title">
                  <label for="task-title-{{ index }}">Task Title</label>
                  <input id="task-title-{{ index }}" v-model="step.taskTitle" placeholder="Task" />
                </div>
                <div class="deployment-plan--step-detail">
                  <label for="required-time-{{ index }}">Required Time (min)</label>
                  <input id="required-time-{{ index }}" v-model.number="step.requiredTime" type="number" placeholder="Required Time (min)" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="task-description-{{ index }}">Task Description</label>
                  <textarea id="task-description-{{ index }}" v-model="step.taskDescription" placeholder="Task Description"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="planned-start-{{ index }}">Planned Start Time</label>
                  <input id="planned-start-{{ index }}" v-model="step.plannedStart" type="datetime-local" placeholder="Planned Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="planned-end-{{ index }}">Planned End Time</label>
                  <input id="planned-end-{{ index }}" v-model="step.plannedEnd" type="datetime-local" placeholder="Planned End Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-start-{{ index }}">Actual Start Time</label>
                  <input id="actual-start-{{ index }}" v-model="step.actualStart" type="datetime-local" placeholder="Actual Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-end-{{ index }}">Actual End Time</label>
                  <input id="actual-end-{{ index }}" v-model="step.actualEnd" type="datetime-local" placeholder="Actual End Time" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="status-{{ index }}">Status</label>
                  <select id="status-{{ index }}" v-model="step.status" >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="responsible-team-{{ index }}">Responsible Team/Vendor</label>
                  <input id="responsible-team-{{ index }}" v-model="step.responsibleTeam" placeholder="Responsible Team/Vendor" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="allocated-person-{{ index }}">Allocated Person</label>
                  <input id="allocated-person-{{ index }}" v-model="step.allocatedPerson" placeholder="Allocated Person" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="comments-{{ index }}">Comments</label>
                  <textarea id="comments-{{ index }}" v-model="step.comments" placeholder="Comments"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-actions">
                <button type="button" @click="removeStep(index, step.id)">Remove Step</button>
              </div>
            </div>
          </div>
          <!-- Add new step button -->
          <button type="button" @click="addImplementationStep">Add Step</button>
        </div>
        <div class="deployment-plan--stage">
          <div class="deployment-plan--stage-title">
            <h3>3. Verification Stage</h3>
          </div>
          <div class="deployment-plan--steps">
            <div v-for="(step, index) in computedStepsVerification" :key="index" class="deployment-plan--step">
              <div class="deployment-plan--step-title">{{ step.stage }} - Step 3.{{ index + 1 }}</div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail deployment-plan--task-title">
                  <label for="task-title-{{ index }}">Task Title</label>
                  <input id="task-title-{{ index }}" v-model="step.taskTitle" placeholder="Task" />
                </div>
                <div class="deployment-plan--step-detail">
                  <label for="required-time-{{ index }}">Required Time (min)</label>
                  <input id="required-time-{{ index }}" v-model.number="step.requiredTime" type="number" placeholder="Required Time (min)" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="task-description-{{ index }}">Task Description</label>
                  <textarea id="task-description-{{ index }}" v-model="step.taskDescription" placeholder="Task Description"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="planned-start-{{ index }}">Planned Start Time</label>
                  <input id="planned-start-{{ index }}" v-model="step.plannedStart" type="datetime-local" placeholder="Planned Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="planned-end-{{ index }}">Planned End Time</label>
                  <input id="planned-end-{{ index }}" v-model="step.plannedEnd" type="datetime-local" placeholder="Planned End Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-start-{{ index }}">Actual Start Time</label>
                  <input id="actual-start-{{ index }}" v-model="step.actualStart" type="datetime-local" placeholder="Actual Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-end-{{ index }}">Actual End Time</label>
                  <input id="actual-end-{{ index }}" v-model="step.actualEnd" type="datetime-local" placeholder="Actual End Time" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="status-{{ index }}">Status</label>
                  <select id="status-{{ index }}" v-model="step.status" >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="responsible-team-{{ index }}">Responsible Team/Vendor</label>
                  <input id="responsible-team-{{ index }}" v-model="step.responsibleTeam" placeholder="Responsible Team/Vendor" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="allocated-person-{{ index }}">Allocated Person</label>
                  <input id="allocated-person-{{ index }}" v-model="step.allocatedPerson" placeholder="Allocated Person" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="comments-{{ index }}">Comments</label>
                  <textarea id="comments-{{ index }}" v-model="step.comments" placeholder="Comments"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-actions">
                <button type="button" @click="removeStep(index, step.id)">Remove Step</button>
              </div>
            </div>
          </div>
          <!-- Add new step button -->
          <button type="button" @click="addVerificationStep">Add Step</button>
        </div>
        <div class="deployment-plan--stage">
          <div class="deployment-plan--stage-title">
            <h3>4. Finalization Stage</h3>
          </div>
          <div class="deployment-plan--steps">
            <div v-for="(step, index) in computedStepsFinalization" :key="index" class="deployment-plan--step">
              <div class="deployment-plan--step-title">{{ step.stage }} - Step 4.{{ index + 1 }}</div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail deployment-plan--task-title">
                  <label for="task-title-{{ index }}">Task Title</label>
                  <input id="task-title-{{ index }}" v-model="step.taskTitle" placeholder="Task" />
                </div>
                <div class="deployment-plan--step-detail">
                  <label for="required-time-{{ index }}">Required Time (min)</label>
                  <input id="required-time-{{ index }}" v-model.number="step.requiredTime" type="number" placeholder="Required Time (min)" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="task-description-{{ index }}">Task Description</label>
                  <textarea id="task-description-{{ index }}" v-model="step.taskDescription" placeholder="Task Description"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="planned-start-{{ index }}">Planned Start Time</label>
                  <input id="planned-start-{{ index }}" v-model="step.plannedStart" type="datetime-local" placeholder="Planned Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="planned-end-{{ index }}">Planned End Time</label>
                  <input id="planned-end-{{ index }}" v-model="step.plannedEnd" type="datetime-local" placeholder="Planned End Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-start-{{ index }}">Actual Start Time</label>
                  <input id="actual-start-{{ index }}" v-model="step.actualStart" type="datetime-local" placeholder="Actual Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-end-{{ index }}">Actual End Time</label>
                  <input id="actual-end-{{ index }}" v-model="step.actualEnd" type="datetime-local" placeholder="Actual End Time" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="status-{{ index }}">Status</label>
                  <select id="status-{{ index }}" v-model="step.status" >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="responsible-team-{{ index }}">Responsible Team/Vendor</label>
                  <input id="responsible-team-{{ index }}" v-model="step.responsibleTeam" placeholder="Responsible Team/Vendor" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="allocated-person-{{ index }}">Allocated Person</label>
                  <input id="allocated-person-{{ index }}" v-model="step.allocatedPerson" placeholder="Allocated Person" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="comments-{{ index }}">Comments</label>
                  <textarea id="comments-{{ index }}" v-model="step.comments" placeholder="Comments"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-actions">
                <button type="button" @click="removeStep(index, step.id)">Remove Step</button>
              </div>
            </div>
          </div>
          <!-- Add new step button -->
          <button type="button" @click="addFinalizationStep">Add Step</button>
        </div>
        <div class="deployment-plan--stage">
          <div class="deployment-plan--stage-title">
            <h3>5. Rollback Stage</h3>
          </div>
          <div class="deployment-plan--steps">
            <div v-for="(step, index) in computedStepsRollback" :key="index" class="deployment-plan--step">
              <div class="deployment-plan--step-title">{{ step.stage }} - Step 5.{{ index + 1 }}</div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail deployment-plan--task-title">
                  <label for="task-title-{{ index }}">Task Title</label>
                  <input id="task-title-{{ index }}" v-model="step.taskTitle" placeholder="Task" />
                </div>
                <div class="deployment-plan--step-detail">
                  <label for="required-time-{{ index }}">Required Time (min)</label>
                  <input id="required-time-{{ index }}" v-model.number="step.requiredTime" type="number" placeholder="Required Time (min)" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="task-description-{{ index }}">Task Description</label>
                  <textarea id="task-description-{{ index }}" v-model="step.taskDescription" placeholder="Task Description"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="planned-start-{{ index }}">Planned Start Time</label>
                  <input id="planned-start-{{ index }}" v-model="step.plannedStart" type="datetime-local" placeholder="Planned Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="planned-end-{{ index }}">Planned End Time</label>
                  <input id="planned-end-{{ index }}" v-model="step.plannedEnd" type="datetime-local" placeholder="Planned End Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-start-{{ index }}">Actual Start Time</label>
                  <input id="actual-start-{{ index }}" v-model="step.actualStart" type="datetime-local" placeholder="Actual Start Time" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="actual-end-{{ index }}">Actual End Time</label>
                  <input id="actual-end-{{ index }}" v-model="step.actualEnd" type="datetime-local" placeholder="Actual End Time" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="status-{{ index }}">Status</label>
                  <select id="status-{{ index }}" v-model="step.status" >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="responsible-team-{{ index }}">Responsible Team/Vendor</label>
                  <input id="responsible-team-{{ index }}" v-model="step.responsibleTeam" placeholder="Responsible Team/Vendor" />
                </div>

                <div class="deployment-plan--step-detail">
                  <label for="allocated-person-{{ index }}">Allocated Person</label>
                  <input id="allocated-person-{{ index }}" v-model="step.allocatedPerson" placeholder="Allocated Person" />
                </div>
              </div>
              <div class="deployment-plan--step-wrapper">
                <div class="deployment-plan--step-detail">
                  <label for="comments-{{ index }}">Comments</label>
                  <textarea id="comments-{{ index }}" v-model="step.comments" placeholder="Comments"></textarea>
                </div>
              </div>
              <div class="deployment-plan--step-actions">
                <button type="button" @click="removeStep(index, step.id)">Remove Step</button>
              </div>
            </div>
          </div>
          <!-- Add new step button -->
          <button type="button" @click="addRollbackStep">Add Step</button>
        </div>

      </div>
    </template>

    <div class="save-changes">
      <button type="submit">Save</button>
    </div>

  </form>
</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
  }

.save-changes {
  margin-top: 20px;
}

.deploymentstep-move,
.deploymentstep-enter-active,
.deploymentstep-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.deploymentstep-enter-active {
  position: relative;
}

.deploymentstep-enter-from,
.deploymentstep-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.deploymentstep-leave-active {
  position: absolute;
}

form {
  width: 100%;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  text-align: left;

  label {
    display: block;
    text-align: left;
    width: 100%;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #0078d4;
    outline: none;
  }

  input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  .change-basic-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .change-basic-info--group {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    &--left {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &--right {
      display: flex;
      flex-direction: column;
      flex: 2;
    }
  }

  .change-window--wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .change-window--details {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      .change-window--detail {
        flex: 1;
      }
    }
  }

  .deployment-plan {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;

    h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    &--step-title {
      font-size: 1.25rem;
      font-weight: bold;
    }

    &--steps {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 1rem;

      ul {
        padding: 0;

        li {
          list-style: none;
          
        }
      }

    }

    &--step {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;

      &-detail {
        flex: 1;
        margin-bottom: 0.5rem;

        &:has(select) {
          min-width: 100px;
        }

        &:has(textarea) {
          width: 100%;
        }
      }

    }

    &--step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    &--step-move {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      
    }

    &--stage {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      background-color: rgba(240, 240, 240, 0.8);
      margin-bottom: 2rem;

      h3 {
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }
      
      button {
        margin: 1rem 0 0 0;
      }
    }

    &--task-title {
      flex: 2;
    }

    &--step-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }

  // Light theme
  @media (prefers-color-scheme: light) {
    label {
      color: #333;
    }
    input,
    select,
    textarea {
      background: #fafbfc;
      color: #222;
      border: 1px solid #ccc;
    }
    input:focus,
    select:focus,
    textarea:focus {
      border-color: #0078d4;
    }
    .deployment-plan--stage {
      background-color: #f5f7fa;
      border-color: #dbe2ea;
      
      li {
        background: #f5f7fa;
      }
    }
  }

  // Dark theme
  @media (prefers-color-scheme: dark) {
    label {
      color: #e0e0e0;
    }
    input,
    select,
    textarea {
      background: #23272f;
      color: #f3f3f3;
      border: 1px solid #444;

      &:focus {
        border-color: #4f8cff;
      }

      &:disabled {
        background: #2c2f33;
        color: #99aab5;
        border: 1px solid #444;
      }

    }
    .deployment-plan--stage {
      background-color: #23272f;
      border-color: #444;
      
      li {
        background: #23272f;
      }
    }
  }
}

</style>
