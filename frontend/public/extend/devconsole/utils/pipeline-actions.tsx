/*eslint-disable no-undef, no-unused-vars */
import * as React from 'react';
import { ALL_NAMESPACES_KEY } from '../../../const';
import { history } from '../../../components/utils';
import { getNamespace, getPerspective } from '../../../components/utils/link';
import { PipelineModel, PipelineRunModel } from '../../../models';
import { PipelineRun, Param } from '../utils/pipeline-augment';
import { pipelineRunFilterReducer } from '../utils/pipeline-filter-reducer';
import { k8sCreate, K8sKind, K8sResourceKind, k8sUpdate } from '../../../module/k8s';

export interface Pipeline extends K8sResourceKind {
  latestRun?: PipelineRun;
  spec?: { pipelineRef?: { name: string }; params: Param[]; resources: PipelineResource[] };
}

export interface PipelineResource {
  name?: string;
  type?: string;
  resourceRef?: {
    name?: string;
  };
}

interface Action {
  label: string | Object;
  callback: () => void;
}

type ActionFunction = (kind: K8sKind, obj: K8sResourceKind) => Action;

const redirectToResourceList = (resource: string) => {
  const url = location.pathname;
  let basePath = '/k8s';
  if (getPerspective(url) === 'dev') {
    basePath = '/dev/k8s';
  }
  const activeNamespace = getNamespace(url);
  const resourceUrl =
    activeNamespace === ALL_NAMESPACES_KEY
      ? `${basePath}/all-namespaces/${resource}`
      : `${basePath}/ns/${activeNamespace}/${resource}`;
  history.push(resourceUrl);
};

export const newPipelineRun = (pipeline: Pipeline, latestRun: PipelineRun): PipelineRun => {
  if (
    (!pipeline || !pipeline.metadata || !pipeline.metadata.name || !pipeline.metadata.namespace) &&
    (!latestRun ||
      !latestRun.metadata ||
      !latestRun.spec ||
      !latestRun.spec.pipelineRef ||
      !latestRun.spec.pipelineRef.name)
  ) {
    // eslint-disable-next-line no-console
    console.error(
      'Unable to create new PipelineRun. Missing "metadata" in ',
      pipeline,
      ' and spec.pipelineRef in ',
      latestRun,
    );
    return null;
  }
  return {
    apiVersion: `${PipelineRunModel.apiGroup}/${PipelineRunModel.apiVersion}`,
    kind: PipelineRunModel.kind,
    metadata: {
      name:
        pipeline && pipeline.metadata && pipeline.metadata.name
          ? `${pipeline.metadata.name}-${Math.random()
            .toString(36)
            .replace(/[^a-z0-9]+/g, '')
            .substr(1, 6)}`
          : latestRun &&
            latestRun.spec &&
            latestRun.spec.pipelineRef &&
            latestRun.spec.pipelineRef.name
            ? `${latestRun.spec.pipelineRef.name}-${Math.random()
              .toString(36)
              .replace(/[^a-z0-9]+/g, '')
              .substr(1, 6)}`
            : `PipelineRun-${Math.random()
              .toString(36)
              .replace(/[^a-z0-9]+/g, '')
              .substr(1, 6)}`,

      namespace:
        latestRun && latestRun.metadata && latestRun.metadata.namespace
          ? latestRun.metadata.namespace
          : pipeline.metadata.namespace || '',
      labels:
        latestRun && latestRun.metadata && latestRun.metadata.labels
          ? latestRun.metadata.labels
          : {
            'tekton.dev/pipeline': pipeline.metadata.name,
          },
    },
    spec: {
      pipelineRef: {
        name:
          latestRun &&
          latestRun.spec &&
          latestRun.spec.pipelineRef &&
          latestRun.spec.pipelineRef.name
            ? latestRun.spec.pipelineRef.name
            : pipeline && pipeline.metadata && pipeline.metadata.name
              ? pipeline.metadata.name
              : null,
      },
      resources:
        latestRun && latestRun.spec && latestRun.spec.resources
          ? latestRun.spec.resources
          : pipeline && pipeline.spec && pipeline.spec.resources
            ? pipeline.spec.resources
            : [],
      params:
        latestRun && latestRun.spec && latestRun.spec.params
          ? latestRun.spec.params
          : pipeline.spec && pipeline.spec.params
            ? pipeline.spec.params
            : null,
      trigger: {
        type: 'manual',
      },
    },
  };
};

export const triggerPipeline = (
  pipeline: Pipeline,
  latestRun: PipelineRun,
  redirectURL?: string,
): ActionFunction => {
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Trigger',
    callback: () => {
      k8sCreate(PipelineRunModel, newPipelineRun(pipeline, latestRun)).then(() => {
        if (redirectURL) {
          redirectToResourceList(redirectURL);
        }
      });
    },
  });
};

export const reRunPipelineRun = (pipelineRun: PipelineRun): ActionFunction => {
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Rerun',
    callback: () => {
      if (
        !pipelineRun ||
        !pipelineRun.metadata ||
        !pipelineRun.metadata.namespace ||
        !pipelineRun.spec ||
        !pipelineRun.spec.pipelineRef ||
        !pipelineRun.spec.pipelineRef.name
      ) {
        // eslint-disable-next-line no-console
        console.error('Improper PipelineRun metadata');
        return;
      }
      k8sCreate(
        PipelineRunModel,
        newPipelineRun(
          {
            apiVersion: `${PipelineModel.apiGroup}/${PipelineModel.apiVersion}`,
            kind: 'Pipeline',
            metadata: {
              name: pipelineRun.spec.pipelineRef.name,
            },
          },
          pipelineRun,
        ),
      );
    },
  });
};

export const rerunPipeline = (
  pipeline: Pipeline,
  latestRun: PipelineRun,
  redirectURL?: string,
): ActionFunction => {
  if (!latestRun || !latestRun.metadata) {
    //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
    return (kind: K8sKind, obj: K8sResourceKind): Action => ({
      label: <div className="dropdown__disabled">Trigger Last Run</div>,
      callback: null,
    });
  }
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Trigger Last Run',
    callback: () => {
      k8sCreate(PipelineRunModel, newPipelineRun(pipeline, latestRun)).then(() => {
        if (redirectURL) {
          redirectToResourceList(redirectURL);
        }
      });
    },
  });
};

export const stopPipelineRun = (pipelineRun: PipelineRun): ActionFunction => {
  if (!pipelineRun || pipelineRunFilterReducer(pipelineRun) !== 'Running') {
    //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
    return (kind: K8sKind, obj: K8sResourceKind): Action => ({
      label: <div className="dropdown__disabled">Stop Pipeline Run</div>,
      callback: null,
    });
  }
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Stop Pipeline Run',
    callback: () => {
      k8sUpdate(PipelineRunModel, pipelineRun, {
        spec: { ...pipelineRun.spec, status: 'PipelineRunCancelled' },
      });
    },
  });
};
