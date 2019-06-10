/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import { PipelineVisualizationTaskItem } from '../../components/pipelines/PipelineVisualizationGraph';
import { formatDuration } from '../../../../components/utils/datetime';
import { K8sResourceKind } from '../../../../module/k8s';

export const TaskStatusClassNameMap = {
  'In Progress': 'is-running',
  Succeeded: 'is-done',
  Failed: 'is-error',
  Idle: 'is-idle',
};
export const conditions = {
  hasFromDependency: (task: PipelineVisualizationTaskItem): boolean =>
    task.hasOwnProperty('resources') &&
    task.resources.hasOwnProperty('inputs') &&
    task.resources.inputs.length > 0 &&
    task.resources.inputs[0].hasOwnProperty('from'),
  hasRunAfterDependency: (task: PipelineVisualizationTaskItem): boolean =>
    task.hasOwnProperty('runAfter') && task.runAfter.length > 0,
};

//to be used by both Pipeline and Pipelinerun visualisation
const sortTasksByRunAfterAndFrom = (
  tasks: PipelineVisualizationTaskItem[],
): PipelineVisualizationTaskItem[] => {
  //check and sort tasks by 'runAfter' and 'from' dependency
  const output = tasks;
  for (let i = 0; i < output.length; i++) {
    let flag = -1;
    if (conditions.hasRunAfterDependency(output[i])) {
      for (let j = 0; j < output.length; j++) {
        if (i < j && output[j].taskRef.name === output[i].runAfter[output[i].runAfter.length - 1]) {
          flag = j;
        }
      }
    } else if (conditions.hasFromDependency(output[i])) {
      for (let j = i + 1; j < output.length; j++) {
        if (output[j].taskRef.name === output[i].resources.inputs[0].from[0]) {
          flag = j;
        }
      }
    }
    if (flag > -1) {
      //swap with last matching task
      const temp = output[flag];
      output[flag] = output[i];
      output[i] = temp;
    }
  }
  return output;
};

/**
 * Appends the pipeline run status to each tasks in the pipeline.
 * @param pipeline
 * @param pipelineRun
 */
const appendPipelineRunStatus = (pipeline, pipelineRun) => {
  return _.map(pipeline.spec.tasks, (task) => {
    if (!pipelineRun.status) {
      return task;
    }
    if (pipelineRun.status && !pipelineRun.status.taskRuns) {
      return _.merge(task, { status: { reason: 'Failed' } });
    }
    const _task = _.merge(task, {
      status: _.get(_.find(pipelineRun.status.taskRuns, { pipelineTaskName: task.name }), 'status'),
    });
    // append task duration
    if (_task.status && _task.status.completionTime && _task.status.startTime) {
      const date =
        new Date(_task.status.completionTime).getTime() -
        new Date(_task.status.startTime).getTime();
      _task.status.duration = formatDuration(date);
    }
    // append task status
    if (!_task.status) {
      _task.status = { reason: 'Idle' };
    } else if (_task.status && _task.status.conditions) {
      const statusCondition = _task.status.conditions.pop();
      if (statusCondition.status === 'True') {
        _task.status.reason = 'Succeeded';
      } else if (statusCondition.status === 'Unknown') {
        _task.status.reason = 'In Progress';
      } else if (statusCondition.status === 'False') {
        _task.status.reason = 'Failed';
      } else {
        _task.status.reason = 'Idle';
      }
    }

    return _task;
  });
};

export const getPipelineTasks = (
  pipeline: K8sResourceKind,
  pipelineRun: K8sResourceKind = { apiVersion: '', metadata: {}, kind: 'PipelineRun' },
): PipelineVisualizationTaskItem[][] => {
  // Each unit in 'out' array is termed as stage | out = [stage1 = [task1], stage2 = [task2,task3], stage3 = [task4]]
  const out = [];
  if (!pipeline.spec || !pipeline.spec.tasks) {
    return out;
  }
  const taskList = appendPipelineRunStatus(pipeline, pipelineRun);
  //Step 1: Sort Tasks to get in correct order
  const tasks = sortTasksByRunAfterAndFrom(taskList);

  //Step 2: Push all nodes without any dependencies in different stages
  tasks.forEach((task) => {
    if (!conditions.hasFromDependency(task) && !conditions.hasRunAfterDependency(task)) {
      out.push([task]);
    }
  });

  //Step 3: Push nodes with 'from' dependency and stack similar tasks in a stage
  tasks.forEach((task) => {
    if (!conditions.hasRunAfterDependency(task) && conditions.hasFromDependency(task)) {
      let flag = out.length - 1;
      for (let i = 0; i < out.length; i++) {
        out[i].forEach((t) => {
          if (t.taskRef.name === task.resources.inputs[0].from[0]) {
            flag = i;
          }
        });
      }
      const nextToFlag = out[flag + 1] ? out[flag + 1] : null;
      if (
        nextToFlag &&
        nextToFlag[0] &&
        nextToFlag[0].resources &&
        nextToFlag[0].resources.inputs &&
        nextToFlag[0].resources.inputs[0] &&
        nextToFlag[0].resources.inputs[0].from &&
        nextToFlag[0].resources.inputs[0].from[0] &&
        nextToFlag[0].resources.inputs[0].from[0] === task.resources.inputs[0].from[0]
      ) {
        nextToFlag.push(task);
      } else {
        out.splice(flag + 1, 0, [task]);
      }
    }
  });

  //Step 4: Push nodes with 'runAfter' dependencies and stack similar tasks in a stage
  tasks.forEach((task) => {
    if (conditions.hasRunAfterDependency(task)) {
      let flag = out.length - 1;
      for (let i = 0; i < out.length; i++) {
        out[i].map((t) => {
          if (t.taskRef.name === task.runAfter[0]) {
            flag = i;
          }
        });
      }
      const nextToFlag = out[flag + 1] ? out[flag + 1] : null;
      if (
        nextToFlag &&
        nextToFlag[0].runAfter &&
        nextToFlag[0].runAfter[0] &&
        nextToFlag[0].runAfter[0] === task.runAfter[0]
      ) {
        nextToFlag.push(task);
      } else {
        out.splice(flag + 1, 0, [task]);
      }
    }
  });
  return out;
};
