/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TaskModel } from '../../../../models';
import { K8sResourceKind, k8sGet } from '../../../../module/k8s';
import { Tooltip } from '@patternfly/react-core';

export const PipelineTooltip = (props) => {
  return (
    <Tooltip position={props.position} content={props.bodyContent}>
      <span className="truncate">{props.children}</span>
    </Tooltip>
  );
};
interface TaskProps {
  task: string;
  namespace: string;
}
interface TaskStates {
  taskDetails: K8sResourceKind;
}

export class PipelineVisualizationTask extends React.Component<TaskProps, TaskStates> {
  constructor(props) {
    super(props);
    this.state = {
      taskDetails: {
        apiVersion: '',
        kind: 'Task',
        metadata: {},
        spec: {},
        status: {},
      },
    };
  }
  componentDidMount() {
    k8sGet(TaskModel, this.props.task, this.props.namespace).then((res) => {
      this.setState({ taskDetails: res });
    });
  }

  getStepCount() {
    return this.state.taskDetails.spec && this.state.taskDetails.spec.steps
      ? this.state.taskDetails.spec.steps.length
      : 0;
  }

  getSteps() {
    return this.getStepCount() ? this.state.taskDetails.spec.steps : [];
  }

  getStepsList() {
    return (
      <ul className="odc-pipeline-steps-details">
        {this.getSteps().map((step, i) => {
          return <li key={i}>{step.name}</li>;
        })}
      </ul>
    );
  }

  render() {
    const task = this.state.taskDetails;
    if (!task || !task.metadata) {
      return null;
    }
    return (
      <li className="odc-pipeline-task">
        <div className="title">
          <PipelineTooltip position="bottom" bodyContent={this.getStepsList()}>
            {this.props.task}
          </PipelineTooltip>
        </div>
        {task.status && task.status.conditions && <div className="status done" />}
        {task.status &&
          task.status.taskruns && <div className="stepcount">({this.getStepCount()})</div>}
      </li>
    );
  }
}
