/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { PipelineVisualizationStepList } from './PipelineVisualizationStepList';
import { K8sResourceKind } from '../../../../module/k8s';
import './PipelineVisualizationTask.scss';
import { Firehose } from '../../../../components/utils';
interface TaskProps {
  loaded?: boolean;
  task?: {
    data: K8sResourceKind;
  };
  namespace: string;
}

interface PipelineVisualizationTaskProp {
  namespace: string;
  task: string;
}

export const PipelineVisualizationTask: React.FC<PipelineVisualizationTaskProp> = (props) => {
  return (
    <Firehose
      resources={[
        {
          kind: 'Task',
          name: props.task,
          namespace: props.namespace,
          prop: 'task',
        },
      ]}
    >
      <TaskComponent namespace={props.namespace} />
    </Firehose>
  );
};
const TaskComponent: React.FC<TaskProps> = (props) => {
  const task = props.task.data;
  return (
    <li className="odc-pipeline-vis-task">
      <Tooltip
        position="bottom"
        enableFlip={false}
        content={<PipelineVisualizationStepList steps={(task.spec && task.spec.steps) || []} />}
      >
        <div className="odc-pipeline-vis-task__content">
          <div className="odc-pipeline-vis-task__title">
            {task.metadata ? task.metadata.name : ''}
          </div>
          {task.status &&
            task.status.conditions && <div className="odc-pipeline-vis-task__status is-done" />}
          {task.status &&
            task.status.taskruns && (
            <div className="odc-pipeline-vis-task__stepcount">({task.spec.steps.length})</div>
          )}
        </div>
      </Tooltip>
    </li>
  );
};
