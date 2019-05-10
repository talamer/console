
interface Task {
  resources?: any;
  runAfter?: any;
  name: string;
}

const sortTasksByRunAfterAndFrom = (tasks: Array<Task>): Array<Task> => {
  //check and sort tasks by 'runAfter' and 'from' dependency
  var output = tasks;
  for (var i = 0; i < output.length; i++) {
    if (output[i].runAfter && output[i].runAfter.length > 0) {
      let flag = -1;
      for (var j = 0; j < output.length; j++) {
        if (i < j && output[j].name == output[i].runAfter[output[i].runAfter.length - 1]) flag = j;
      }
      if (flag > -1) {
        //swap with last matching task
        let temp = output[flag];
        output[flag] = output[i];
        output[i] = temp;
      }
    } else if (
      output[i].resources &&
      output[i].resources.inputs &&
      output[i].resources.inputs[0].from
    ) {
      let flag = -1;
      for (var j = 0; j < output.length; j++) {
        if (i < j && output[j].name == output[i].resources.inputs[0].from[0]) flag = j;
      }
      if (flag > -1) {
        //swap with last matching task
        let temp = output[flag];
        output[flag] = output[i];
        output[i] = temp;
      }
    }
  }
  return output;
};

export const getPipelineTasks = (actualTasks: Array<Task>): Array<Array<Task>> => {
  //P.S: Each element in out array is referred to as stage
  var out = [];

  //Step 1: Sort Tasks to get in correct order
  var tasks = sortTasksByRunAfterAndFrom(actualTasks);

  //Step 2: Push all nodes without any dependencies in different stages
  tasks.map((task) => {
    if (task.runAfter && task.runAfter.length > 0) {
      //do nothing
    } else {
      if (task.resources && task.resources.inputs && task.resources.inputs[0].from) {
        //do nothing
      } else out.push([task]);
    }
    return;
  });

  //Step 3: Push nodes with 'from' dependency and stack similar tasks in a stage
  tasks.map((task) => {
    if (task.runAfter && task.runAfter.length > 0) {
      //do nothing
    } else {
      if (task.resources && task.resources.inputs && task.resources.inputs[0].from) {
        var flag = out.length - 1;
        for (var i = 0; i < out.length; i++) {
          out[i].map((t) => {
            if (t.name == task.resources.inputs[0].from[0]) flag = i;
          });
        }
        var next_to_flag = out[flag + 1] ? out[flag + 1] : null;
        if (
          next_to_flag &&
          next_to_flag[0].resources.inputs[0].from[0] == task.resources.inputs[0].from[0]
        ) {
          next_to_flag.push(task);
        } else {
          out.splice(i + 1, 0, [task]);
        }
      } else {
        //do nothing
      }
    }
    return;
  });

  //Step 4: Push nodes with 'runAfter' dependencies and stack similar tasks in a stage
  tasks.map((task) => {
    if (task.runAfter && task.runAfter.length > 0) {
      var flag = out.length - 1;
      for (var i = 0; i < out.length; i++) {
        out[i].map((t) => {
          if (t.name == task.runAfter[0]) flag = i;
        });
      }
      var next_to_flag = out[flag + 1] ? out[flag + 1] : null;

      if (next_to_flag && next_to_flag[0].runAfter[0] == task.runAfter[0]) {
        next_to_flag.push(task);
      } else {
        out.splice(i + 1, 0, [task]);
      }
    } else {
      //do nothing
    }
    return;
  });
  return out;
};

