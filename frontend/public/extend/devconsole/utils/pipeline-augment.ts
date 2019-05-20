/*eslint-disable prefer-const, no-else-return, no-undef */
export interface PipelineListProps {
  data?: PropPipelineData[];
}
export interface PipelineAugmentRunsProps extends PipelineListProps {
  propsReferenceForRuns?: any;
}
interface Metadata {
  name: string;
  namespace?: string;
}
interface PropPipelineData {
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
  status?: object;
}

interface FirehoseResource {
  kind: string;
  namespace?: string;
  isList?: boolean;
  selector?: object;
}

export const getResources = (p: PipelineAugmentRunsProps): Resource => {
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
  if (field === 'startTime' || field === 'completionTime') {
    let latestRun = runs.data[0];
    for (let i = 1; i < runs.data.length; i++) {
      latestRun =
        runs.data[i] &&
        runs.data[i].status &&
        runs.data[i].hasOwnProperty(field) &&
        runs.data[i][field] > latestRun[field]
          ? runs.data[i]
          : latestRun;
    }
    return latestRun;
  } else {
    return runs.data[runs.data.length - 1];
  }
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
