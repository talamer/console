
/*var pipeline = [
  {
    tasks: [
      {
        name: 'build-app',
        taskRef: {
          name: 'mvn-build',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
            },
          ],
          outputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
            },
          ],
        },
      },
      {
        name: 'test-app',
        taskRef: {
          name: 'mvn-test',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
        },
      },
      {
        name: 'analyse-code',
        taskRef: {
          name: 'static-analysis',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
        },
      },
      {
        name: 'build-image',
        taskRef: {
          name: 'buildah',
        },
        runAfter: ['test-app', 'analyse-code'],
        params: [
          {
            name: 'dockerfile',
            value: 'Dockerfile.openjdk',
          },
          {
            name: 'verifyTLS',
            value: 'false',
          },
        ],
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
          outputs: [
            {
              name: 'image',
              resource: 'mapit-image',
            },
          ],
        },
      },
      {
        name: 'deploy',
        taskRef: {
          name: 'openshift-cli-deploy-mapit',
        },
        runAfter: ['build-image'],
      },
    ],
  },
  {
    tasks: [
      {
        name: 'deploy',
        taskRef: {
          name: 'openshift-cli-deploy-mapit',
        },
        runAfter: ['build-image'],
      },
      {
        name: 'build-app',
        taskRef: {
          name: 'mvn-build',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
            },
          ],
          outputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
            },
          ],
        },
      },
      {
        name: 'test-app',
        taskRef: {
          name: 'mvn-test',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
        },
      },
      {
        name: 'analyse-code',
        taskRef: {
          name: 'static-analysis',
        },
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
        },
      },
      {
        name: 'build-image',
        taskRef: {
          name: 'buildah',
        },
        runAfter: ['test-app', 'analyse-code'],
        params: [
          {
            name: 'dockerfile',
            value: 'Dockerfile.openjdk',
          },
          {
            name: 'verifyTLS',
            value: 'false',
          },
        ],
        resources: {
          inputs: [
            {
              name: 'workspace-git',
              resource: 'mapit-git',
              from: ['build-app'],
            },
          ],
          outputs: [
            {
              name: 'image',
              resource: 'mapit-image',
            },
          ],
        },
      },
    ],
  },
];*/
const sortTasksByRunAfterAndFrom = (tasks) => {
  //check and sort the run afters and from
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

export const getOutput = (actualTasks):Array<Array<Object>> => {
  var tasks = sortTasksByRunAfterAndFrom(actualTasks);
  var out = [];
  //Push start node and nodes without dependencies
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
  //Push nodes with from property
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
          console.log('b-if', task.name, flag);
          next_to_flag.push(task);
        } else {
          out.splice(i + 1, 0, [task]);
          console.log('b-else', task.name, flag);
        }
      } else {
        //do nothing
      }
    }
    return;
  });
  //Push nodes with run After dependencies
  tasks.map((task) => {
    if (task.runAfter && task.runAfter.length > 0) {
      var flag = out.length - 1;
      for (var i = 0; i < out.length; i++) {
        out[i].map((t) => {
          if (t.name == task.runAfter[0]) flag = i;
        });
      }
      var next_to_flag = out[flag + 1] ? out[flag + 1] : null;

      if (next_to_flag && 
        next_to_flag[0].runAfter[0] == task.runAfter[0]) {
        console.log('a-if', next_to_flag, task.runAfter, flag);
        next_to_flag.push(task);
      } else {
        console.log('a-else', task.name, flag);
        out.splice(i + 1, 0, [task]);
      }
    } else {
      if (task.resources && task.resources.inputs && task.resources.inputs[0].from) {
        //do nothing
      } else {
        //do nothing
      }
    }
    return;
  });
  return out;
};
