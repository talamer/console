/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { getPipelineTasks } from '../utils/visualization';
import { TaskModel } from '../../../../models';
import { k8sGet } from '../../../../module/k8s';

interface PipelineVisualizationProps {
  pipeline: any;
}
interface PipelineVisualizationStates {
  tasks: any;
}
interface TaskProps {
  task: string;
  namespace: string;
}
interface TaskStates {
  taskDetails: any;
}

//to be moved in separate file

class Task extends React.Component<TaskProps, TaskStates> {
  constructor(props) {
    super(props);
    this.state = { taskDetails: {} };
  }

  componentDidMount() {
    k8sGet(TaskModel, this.props.task, this.props.namespace).then((res) => {
      console.log('k8sget', res);
      this.setState({taskDetails:res});
    });
  }

  //Please alter task name and error message logic as per UX
  render() {
    //use in CSS file
    const taskStyle = {
      color: 'blue',
      background: '#fafafa',
      border: '2px solid #777',
      width: '200px',
      padding: '10px',
      margin: '5px',
    };
    return (
      <div style={taskStyle}>
        Steps:
        {this.state.taskDetails.spec && this.state.taskDetails.spec.steps
          ? this.state.taskDetails.spec.steps.length
          : 'error'}
        <br />
        {this.state.taskDetails.metadata && this.state.taskDetails.metadata.name
          ? this.state.taskDetails.metadata.name
          : 'not found'}
      </div>
    );
  }
}

class PipelineVisualization extends React.PureComponent<
  PipelineVisualizationProps,
  PipelineVisualizationStates
> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    //to be put in css file
    const stageStyle = {
      padding: '10px',
      align: 'center',
      border: '1px dotted #eee',
    };

    const stageTitle = {
      color: 'blue',
      margin: '10px',
    };

    const parentDiv = {
      margin: '5%',
    };
    //check for correct argument specs
    if (!this.props.pipeline || !this.props.pipeline.spec || !this.props.pipeline.spec.tasks) {
    }
    const output = getPipelineTasks(this.props.pipeline.spec.tasks);
    return (
      <div style={parentDiv}>
        <h4>Pipeline Visualization Test for {this.props.pipeline.metadata.name}</h4>
        <hr />
        <div className="row">
        {output.map((stage, i) => {
          return (
            <div style={stageStyle} key={i} className="col-lg-2 col-md-2 col-sm-3">
              <h4 style={stageTitle}>Stage {i + 1}</h4>
              {stage.map((t, j) => {
                //check for correct argument specs
                if (!t.name || !this.props.pipeline.metadata.namespace) {
                }
                return (
                  <Task key={j} task={t.name} namespace={this.props.pipeline.metadata.namespace} />
                );
              })}
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}

export default PipelineVisualization;
