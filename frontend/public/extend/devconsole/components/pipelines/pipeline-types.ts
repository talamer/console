/* eslint-disable no-unused-vars, no-undef */
import { K8sResourceKind } from '../../../../module/k8s';

export interface PipelineVisualizationProps {
  pipeline?: K8sResourceKind;
}

interface Resources {
  inputs?: Resource[];
  outputs?: Resource[];
}

interface Resource {
  name: string;
  resource?: string;
  from?: string[];
}

export interface PipelineVisualizationTaskProp {
  name: string;
  resources?: Resources;
  params?: object;
  runAfter?: string[];
  taskRef: {
    name: string;
  };
}
