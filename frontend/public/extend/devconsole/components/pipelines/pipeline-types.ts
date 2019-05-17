/* eslint-disable no-unused-vars, no-undef */
import { K8sResourceKind } from '../../../../module/k8s';

export interface PipelineVisualizationProps {
  pipeline?: K8sResourceKind;
}

export interface PipelineVisualizationTaskProp {
  name: string;
  resources?: {
    inputs?: object;
    outputs?: object;
  };
  params?: object;
  runAfter?: string[];
  taskRef: {
    name: string;
  };
}
