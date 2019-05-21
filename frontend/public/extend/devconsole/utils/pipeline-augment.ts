/*eslint-disable prefer-const, no-else-return, no-undef, no-unused-vars */
import { pipelineRunFilterReducer } from './pipeline-filter-reducer';
import { PipelineListProps } from '../components/pipelines/PipelineList';
import { PipelineAugmentRunsProps } from '../components/pipelines/PipelineAugmentRuns';

interface Metadata {
  name: string;
  namespace?: string;
}
export interface PropPipelineData {
  metadata: Metadata;
  latestRun?: Run;
}

export interface Resource {
  propsReferenceForRuns: string[];
  resources: FirehoseResource[];
}

export interface Runs {
  data?: Run[];
}

interface Run {
  metadata?: Metadata;
  status?: {
    conditions?: object[];
    succeededCondition?: string;
    creationTimeStamp?: string;
  };
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

export const getLatestRun = (runs: Runs, field: string): Run => {
  if (!runs || !runs.data || !(runs.data.length > 0) || !field) {
    return {};
  }
  let latestRun = runs.data[0];
  if (field === 'startTime' || field === 'completionTime') {
    for (let i = 1; i < runs.data.length; i++) {
      latestRun =
        runs.data[i] &&
        runs.data[i].status &&
        runs.data[i].hasOwnProperty(field) &&
        runs.data[i][field] > latestRun[field]
          ? runs.data[i]
          : latestRun;
    }
  } else {
    latestRun = runs.data[runs.data.length - 1];
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
    (reference, i) => (newData[i].latestRun = getLatestRun(p[reference], 'creationTimeStamp')),
  );
  return newData;
};
