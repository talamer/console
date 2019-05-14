/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TaskModel } from '../../../../models';
import { k8sGet } from '../../../../module/k8s';
import { Link } from 'react-router-dom';
import { resourcePath } from '../../../../components/utils';
import { K8sResourceKind } from '../../../../module/k8s';

import { Popover } from '@patternfly/react-core';

const PipelinePopover = (props) => {
  return (
    <Popover position={props.position} bodyContent={props.bodyContent} aria-label="close">
      <div className="truncate">{props.children}</div>
    </Popover>
  );
};

interface TaskProps {
  task: string;
  namespace: string;
}
interface TaskStates {
  taskDetails: K8sResourceKind;
}

export default class PipelineVisualization extends React.Component<TaskProps, TaskStates> {
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

  getTaskLink() {
    const task = this.state.taskDetails.metadata;
    const path = resourcePath('Task', task.name, task.namespace);
    return path;
  }

  getTaskLinks() {
    return (
      <ul className="odc-pipeline-task-details-list">
        <li>
          <Link to={this.getTaskLink()} title={this.state.taskDetails.metadata.name}>
            View Task Details
          </Link>
        </li>
        <li>View Logs</li>
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
          <PipelinePopover position="bottom" bodyContent={this.getTaskLinks()}>
            {task.metadata.name}
          </PipelinePopover>
        </div>
        {task.status && task.status.reason && <div className="status done" />}
        {task.status &&
          task.status.duration && <div className="duration">{task.status.duration}</div>}
        <div className="steps">
          <PipelinePopover position="right" bodyContent={this.getStepsList()}>
            Steps - ({this.getStepCount()})
          </PipelinePopover>
        </div>
      </li>
    );
  }
}
