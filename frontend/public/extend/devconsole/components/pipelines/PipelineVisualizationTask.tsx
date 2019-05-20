/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { PipelineVisualizationStepList } from './PipelineVisualizationStepList';
import './PipelineVisualizationTask.scss';
interface TaskProps {
  task: any;
  namespace: string;
  loaded?: boolean;
}

export const PipelineVisualizationTask: React.FC<TaskProps> = (props) => {
  const task = props.task.data;
  if (!props.loaded || !Object.keys(task).length) {
    return null;
  }
  return (
    <li className="odc-pipeline__task">
      <div className="title">
        <Tooltip
          position="bottom"
          content={<PipelineVisualizationStepList steps={task.spec.steps || []} />}
        >
          <span className="truncate">{task.metadata.name}</span>
        </Tooltip>
      </div>
      {task.status && task.status.conditions && <div className="status done" />}
      {task.status &&
        task.status.taskruns && <div className="stepcount">({task.spec.steps.length})</div>}
    </li>
  );
};
