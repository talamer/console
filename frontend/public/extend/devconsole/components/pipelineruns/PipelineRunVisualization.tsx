/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PipelineVisualizationGraph } from '../pipelines/PipelineVisualizationGraph';
import { getPipelineTasks } from '../../shared/utils/pipeline-utils';
import { K8sResourceKind, k8sGet } from '../../../../module/k8s';
import { PipelineModel } from '../../../../models';

export interface PipelineRunVisualizationProps {
  pipelineRun: K8sResourceKind;
}

export interface PipelineVisualizationRunState {
  pipeline: K8sResourceKind;
}

export class PipelineRunVisualization extends React.Component<
  PipelineRunVisualizationProps,
  PipelineVisualizationRunState
  > {
  constructor(props) {
    super(props);
    this.state = { pipeline: { apiVersion: '', metadata: {}, kind: 'PipelineRun' } };
  }
  componentDidMount() {
    k8sGet(
      PipelineModel,
      this.props.pipelineRun.spec.pipelineRef.name,
      this.props.pipelineRun.metadata.namespace,
    ).then((res) => {
      this.setState({
        pipeline: res,
      });
    });
  }

  render() {
    return (
      <PipelineVisualizationGraph
        namespace={this.props.pipelineRun.metadata.namespace}
        graph={getPipelineTasks(this.state.pipeline, this.props.pipelineRun)}
      />
    );
  }
}
