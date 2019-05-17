/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PipelineVisualizationTask } from './PipelineVisualizationTask';
import './PipelineVisualization.scss';
import { PipelineVisualizationTaskProp } from './pipeline-types';

export interface PipelineVisualizationGraphProps {
  graph: Array<PipelineVisualizationTaskProp[]>;
  namespace: string;
}

export default class PipelineVisualizationGraph extends React.PureComponent<
  PipelineVisualizationGraphProps
  > {
  render() {
    return (
      <div className="odc-pipeline-graph">
        <div className="odc-pipeline-stages">
          <div className="odc-pipeline-stage">
            <div className="odc-pipeline-task input-node" />
          </div>
          {this.props.graph.map((stage, i) => {
            return (
              <div className={`odc-pipeline-stage ${stage.length > 1 ? 'parallel' : ''}`} key={i}>
                <ul className="odc-pipeline-stage-column">
                  {stage.map((task, j) => {
                    return (
                      <PipelineVisualizationTask
                        key={j}
                        task={task.taskRef.name}
                        namespace={this.props.namespace}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
