/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PipelineVisualizationGraph } from './PipelineVisualizationGraph';
import { getPipelineTasks } from '../../shared/utils/pipeline-utils';
import { K8sResourceKind } from '../../../../module/k8s';

export interface PipelineVisualizationProps {
  pipeline?: K8sResourceKind;
}

export const PipelineVisualization: React.FC<PipelineVisualizationProps> = ({ pipeline }) => (
  <PipelineVisualizationGraph
    namespace={pipeline.metadata.namespace}
    graph={getPipelineTasks(pipeline)}
  />
);
