/*eslint-disable no-undef, no-unused-vars */
import * as React from 'react';
import { ALL_NAMESPACES_KEY } from '../../../const';
import { history } from '../../../components/utils';
import { getNamespace, getPerspective } from '../../../components/utils/link';
import { PipelineModel, PipelinerunModel } from '../../../models';
import { PipelineRun, Param, getLatestRun } from '../utils/pipeline-augment';
import { pipelineRunFilterReducer } from '../utils/pipeline-filter-reducer';
import {
  k8sCreate,
  k8sGet,
  k8sList,
  K8sKind,
  K8sResourceKind,
  k8sUpdate,
} from '../../../module/k8s';

export interface Pipeline extends K8sResourceKind {
  latestRun?: PipelineRun;
  spec?: { pipelineRef?: { name: string }; params: Param[] };
}

interface Action {
  label: string | Object;
  callback: () => void;
}

type ActionFunction = (kind: K8sKind, obj: K8sResourceKind) => Action;

const redirectToResourceList = (resource: string) => {
  const url = location.pathname;
  let basePath = '/k8s/';
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
  if (!pipeline || !pipeline.metadata || !pipeline.metadata.name || !pipeline.metadata.namespace) {
    // eslint-disable-next-line no-console
    console.error('Unable to create new PipelineRun. Missing "metadata" in ', pipeline);
    return null;
  }
  return {
    apiVersion: `${PipelinerunModel.apiGroup}/${PipelinerunModel.apiVersion}`,
    kind: PipelinerunModel.kind,
    metadata: {
      name:
        latestRun && latestRun.metadata && latestRun.metadata.name
          ? isNaN(parseInt(latestRun.metadata.name[latestRun.metadata.name.length - 1], 10))
            ? `${latestRun.metadata.name}-1`
            : [
              latestRun.metadata.name.slice(0, -1),
              parseInt(latestRun.metadata.name[latestRun.metadata.name.length - 1], 10) + 1,
            ].join('')
          : `${pipeline.metadata.name}-run-1`,
      namespace: pipeline.metadata.namespace || '',
      labels:
        latestRun && latestRun.metadata && latestRun.metadata.labels
          ? latestRun.metadata.labels
          : {
            'tekton.dev/pipeline': pipeline.metadata.name,
          },
    },
    spec: {
      pipelineRef: {
        name: pipeline.metadata.name,
      },
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
  redirectURL: string,
): ActionFunction => {
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Trigger',
    callback: () => {
      k8sCreate(PipelinerunModel, newPipelineRun(pipeline, latestRun)).then(() => {
        if (redirectURL && redirectURL !== '') {
          redirectToResourceList(redirectURL);
        }
      });
    },
  });
};

export const fetchAndReRun = (pipelineRun: PipelineRun): ActionFunction => {
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Trigger',
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
      k8sGet(PipelineModel, pipelineRun.spec.pipelineRef.name, pipelineRun.metadata.namespace).then(
        (res) => {
          k8sList(
            PipelinerunModel,
            res.metadata.name === pipelineRun.spec.pipelineRef.name
              ? {
                labelSelector: { 'tekton.dev/pipeline': res.metadata.name },
              }
              : {},
          ).then((listres) => {
            k8sCreate(
              PipelinerunModel,
              newPipelineRun(res, {
                ...pipelineRun,
                metadata: {
                  ...pipelineRun.metadata,
                  name: getLatestRun({ data: listres }, 'creationTimestamp').metadata.name,
                },
              }),
            );
          });
        },
      );
    },
  });
};

export const rerunPipeline = (
  pipeline: Pipeline,
  latestRun: PipelineRun,
  redirectURL: string,
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
      k8sCreate(PipelinerunModel, newPipelineRun(pipeline, latestRun));
      if (redirectURL && redirectURL !== '') {
        redirectToResourceList(redirectURL);
      }
    },
  });
};

export const stopPipelineRun = (pipelineRun: PipelineRun): ActionFunction => {
  if (!pipelineRun || pipelineRunFilterReducer(pipelineRun) !== 'Running') {
    //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
    return (kind: K8sKind, obj: K8sResourceKind): Action => ({
      label: <div className="dropdown__disabled">Stop Pipeline</div>,
      callback: null,
    });
  }
  //The returned function will be called using the 'kind' and 'obj' in Kebab Actions
  return (kind: K8sKind, obj: K8sResourceKind): Action => ({
    label: 'Stop Pipeline Run',
    callback: () => {
      k8sUpdate(PipelinerunModel, pipelineRun, {
        spec: { ...pipelineRun.spec, status: 'PipelineRunCancelled' },
      });
    },
  });
};
