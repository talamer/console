/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PipelineVisualizationTask } from './PipelineVisualizationTask';
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
    <div className="odc-pipeline__graph">
      <div className="odc-pipeline__stages">
        <div className="odc-pipeline__stage">
          <div className="odc-pipeline__task input-node" />
        </div>
        {graph.map((stage, i) => {
          const stageClassName = 'odc-pipeline__stage';
          return (
            <div
              className={stage.length <= 1 ? stageClassName : `${stageClassName}--is-parallel`}
              key={`stage:${i}`}
            >
              <ul className="odc-pipeline__stage-column">
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
                      <PipelineVisualizationTask task={task.taskRef.name} namespace={namespace} />
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
