/*eslint-disable prefer-const, no-else-return, no-undef, no-unused-vars */
import { pipelineRunFilterReducer } from './pipeline-filter-reducer';
import { PipelineListProps } from '../components/pipelines/PipelineList';
import { PipelineAugmentRunsProps } from '../components/pipelines/PipelineAugmentRuns';
import { PipelineResource } from './pipeline-actions';
import { K8sResourceKind } from '../../../module/k8s';

interface Metadata {
  name: string;
  namespace?: string;
}
export interface PropPipelineData {
  metadata: Metadata;
  latestRun?: PipelineRun;
}

export interface Resource {
  propsReferenceForRuns: string[];
  resources: FirehoseResource[];
}

export interface Runs {
  data?: PipelineRun[];
}

export interface PipelineRun extends K8sResourceKind {
  spec?: {
    pipelineRef?: { name: string };
    params: Param[];
    trigger: {
      type: string;
    };
    resources: PipelineResource[];
  };
  status?: {
    succeededCondition?: string;
    creationTimestamp?: string;
    conditions?: Condition[];
    startTime?: string;
    completionTime?: string;
  };
}

interface Condition {
  type: string;
  status: string;
}

export interface Param {
  input: string;
  output: string;
  resource?: object;
}

interface FirehoseResource {
  kind: string;
  namespace?: string;
  isList?: boolean;
  selector?: object;
}

export const getResources = (p: PipelineListProps): Resource => {
  let resources = [];
  let propsReferenceForRuns = [];
  if (p && p.data && p.data.length > 0) {
    p.data.forEach((pipeline, i) => {
      if (pipeline.metadata && pipeline.metadata.namespace && pipeline.metadata.name) {
        propsReferenceForRuns.push(`PipelineRun_${i}`);
        resources.push({
          kind: 'PipelineRun',
          namespace: pipeline.metadata.namespace,
          isList: true,
          prop: `PipelineRun_${i}`,
          selector: {
            'tekton.dev/pipeline': pipeline.metadata.name,
          },
        });
      }
    });
    return { propsReferenceForRuns, resources };
  }
  return { propsReferenceForRuns: null, resources: null };
};

export const getLatestRun = (runs: Runs, field: string): PipelineRun => {
  if (!runs || !runs.data || !(runs.data.length > 0) || !field) {
    return null;
  }
  let latestRun = runs.data[0];
  if (field === 'creationTimestamp') {
    for (let i = 1; i < runs.data.length; i++) {
      latestRun =
        runs.data[i] &&
        runs.data[i].metadata &&
        runs.data[i].metadata.hasOwnProperty(field) &&
        new Date(runs.data[i].metadata[field]) > new Date(latestRun.metadata[field])
          ? runs.data[i]
          : latestRun;
    }
  } else {
    if (field === 'startTime' || field === 'completionTime') {
      for (let i = 1; i < runs.data.length; i++) {
        latestRun =
          runs.data[i] &&
          runs.data[i].status &&
          runs.data[i].status.hasOwnProperty(field) &&
          new Date(runs.data[i].status[field]) > new Date(latestRun.status[field])
            ? runs.data[i]
            : latestRun;
      }
    } else {
      latestRun = runs.data[runs.data.length - 1];
    }
  }
  if (!latestRun.status) {
    latestRun = { ...latestRun, status: {} };
  }
  if (!latestRun.status.succeededCondition) {
    latestRun.status = { ...latestRun.status, succeededCondition: '' };
  }
  latestRun.status.succeededCondition = pipelineRunFilterReducer(latestRun);
  return latestRun;
};

export const augmentRunsToData = (p: PipelineAugmentRunsProps) => {
  const newData = p.data;
  if (!p.propsReferenceForRuns || !(p.propsReferenceForRuns.length > 0)) {
    return p.data;
  }
  p.propsReferenceForRuns.forEach(
    (reference, i) => (newData[i].latestRun = getLatestRun(p[reference], 'creationTimestamp')),
  );
  return newData;
};
