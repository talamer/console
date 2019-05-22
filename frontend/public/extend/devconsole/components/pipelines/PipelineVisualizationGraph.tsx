/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as cx from 'classnames';
import { PipelineVisualizationTask } from './PipelineVisualizationTask';
import { ChevronCircleRightIcon } from '@patternfly/react-icons';
import './PipelineVisualizationGraph.scss';
import { Firehose } from '../../../../components/utils';

interface Resources {
  inputs?: Resource[];
  outputs?: Resource[];
}

interface Resource {
  name: string;
  resource?: string;
  from?: string[];
}
export interface PipelineVisualizationTaskItem {
  name: string;
  resources?: Resources;
  params?: object;
  runAfter?: string[];
  taskRef: {
    name: string;
  };
}
export interface PipelineVisualizationGraphProps {
  graph: Array<PipelineVisualizationTaskItem[]>;
  namespace: string;
}

export const PipelineVisualizationGraph: React.FC<PipelineVisualizationGraphProps> = ({
  graph,
  namespace,
}) => {
  return (
    <div className="odc-pipeline-vis-graph">
      <div className="odc-pipeline-vis-graph__stages">
        <div className="odc-pipeline-vis-graph__stage">
          <div className="odc-pipeline-vis-task is-input-node">
            <ChevronCircleRightIcon />
          </div>
        </div>
        {graph.map((stage, i) => {
          return (
            <div
              className={cx('odc-pipeline-vis-graph__stage', { 'is-parallel': stage.length > 1 })}
              key={`stage:${i}`}
            >
              <ul className="odc-pipeline-vis-graph__stage-column">
                {stage.map((task, j) => {
                  return (
                    <Firehose
                      key={`${task.taskRef.name}:${i + j}`}
                      resources={[
                        {
                          kind: 'Task',
                          name: task.taskRef.name,
                          namespace,
                          prop: 'task',
                        },
                      ]}
                    >
                      <PipelineVisualizationTask namespace={namespace} />
                    </Firehose>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
