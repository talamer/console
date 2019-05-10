/* eslint-disable no-unused-vars, no-undef */
interface Task {
  resources?: Resources;
  runAfter?: string[];
  name: string;
  taskRef: { name: string };
}

interface Resources {
  inputs: Resource[];
  outputs: Resource[];
}

interface Resource {
  name: string;
  resource: string;
  from?: string;
}

export const conditions = {
  hasFromDependency: (task: Task): boolean =>
    task.hasOwnProperty('resources') &&
    task.resources.hasOwnProperty('inputs') &&
    task.resources.inputs[0].hasOwnProperty('from'),
  hasRunAfterDependency: (task: Task): boolean =>
    task.hasOwnProperty('runAfter') && task.runAfter.length > 0,
};

//to be used by both Pipeline and Pipelinerun visualisation
const sortTasksByRunAfterAndFrom = (tasks: Task[]): Task[] => {
  //check and sort tasks by 'runAfter' and 'from' dependency
  const output = tasks;
  for (let i = 0; i < output.length; i++) {
    if (conditions.hasRunAfterDependency(output[i])) {
      let flag = -1;
      for (let j = 0; j < output.length; j++) {
        if (i < j && output[j].taskRef.name === output[i].runAfter[output[i].runAfter.length - 1]) {
          flag = j;
        }
      }
      if (flag > -1) {
        //swap with last matching task
        const temp = output[flag];
        output[flag] = output[i];
        output[i] = temp;
      }
    } else if (conditions.hasFromDependency(output[i])) {
      let flag = -1;
      for (let j = 0; j < output.length; j++) {
        if (i < j && output[j].taskRef.name === output[i].resources.inputs[0].from[0]) {
          flag = j;
        }
      }
      if (flag > -1) {
        //swap with last matching task
        const temp = output[flag];
        output[flag] = output[i];
        output[i] = temp;
      }
    }
  }
  return output;
};

export const getPipelineTasks = (actualTasks: Task[]): Task[][] => {
  //P.S: Each element in out array is referred to as stage
  const out = [];
  //Step 1: Sort Tasks to get in correct order
  const tasks = sortTasksByRunAfterAndFrom(actualTasks);

  //Step 2: Push all nodes without any dependencies in different stages
  tasks.map((task) => {
    if (!conditions.hasFromDependency(task) && !conditions.hasRunAfterDependency(task)) {
      out.push([task]);
    }
    return;
  });

  //Step 3: Push nodes with 'from' dependency and stack similar tasks in a stage
  tasks.map((task) => {
    if (!conditions.hasRunAfterDependency(task) && conditions.hasFromDependency(task)) {
      let flag = out.length - 1;
      for (let i = 0; i < out.length; i++) {
        out[i].map((t) => {
          if (t.taskRef.name === task.resources.inputs[0].from[0]) {
            flag = i;
          }
        });
      }
      const nextToFlag = out[flag + 1] ? out[flag + 1] : null;
      if (
        nextToFlag &&
        nextToFlag[0].resources.inputs[0].from[0] === task.resources.inputs[0].from[0]
      ) {
        nextToFlag.push(task);
      } else {
        out.splice(flag + 1, 0, [task]);
      }
    }
    return;
  });

  //Step 4: Push nodes with 'runAfter' dependencies and stack similar tasks in a stage
  tasks.map((task) => {
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

      if (nextToFlag && nextToFlag[0].runAfter[0] === task.runAfter[0]) {
        nextToFlag.push(task);
      } else {
        out.splice(flag + 1, 0, [task]);
      }
    }
    return;
  });
  return out;
};
