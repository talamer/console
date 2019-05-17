/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import PipelineVisualizationGraph from './PipelineVisualizationGraph';
import { getPipelineTasks } from '../../shared/utils/pipeline-utils';
import { PipelineVisualizationProps } from './pipeline-types';
export default class PipelineVisualization extends React.PureComponent<PipelineVisualizationProps> {
  render() {
    if (!this.props.pipeline) {
      return null;
    }
    return (
      <PipelineVisualizationGraph
        namespace={this.props.pipeline.metadata.namespace}
        graph={getPipelineTasks(this.props.pipeline.spec.tasks)}
      />
    );
  }
}
