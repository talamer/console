/*eslint-disable no-unused-vars, no-undef */
import { PipelineRun, Runs } from '../../../utils/pipeline-augment';
import { Pipeline } from '../../../utils/pipeline-actions';
import { PipelineListProps } from '../../pipelines/PipelineList';
import { PipelineAugmentRunsProps } from '../../pipelines/PipelineAugmentRuns';

interface ExtendedPipelineAugmentRunsPropsWith extends PipelineAugmentRunsProps {
  apple1Runs?: Runs;
  apple2Runs?: Runs;
}

interface AdditionalProps {
  propsReferenceForRuns?: string[];
  apple1Runs?: Runs;
  apple2Runs?: Runs;
}
export const listProps: PipelineListProps[] = [
  {},
  { data: [] },
  {
    data: [
      {
        metadata: {
          name: 'apple1',
          namespace: 'myproject',
        },
      },
    ],
  },
  {
    data: [
      {
        metadata: {
          name: 'apple1',
          namespace: 'myproject',
        },
      },
      {
        metadata: {
          name: 'apple2',
          namespace: 'myproject',
        },
      },
    ],
  },
];

// This will be added by Firehose and PipelineList to be passed to PipelineAugmentRuns
export const additionalProps: AdditionalProps[] = [
  {},
  {},
  {
    propsReferenceForRuns: ['apple1Runs'],
    apple1Runs: {
      data: [
        {
          apiVersion: 'abhiapi/v1',
          kind: 'PipelineRun',
          metadata: { name: 'apple-1-run1', creationTimestamp: '21-05-2019' },
          status: { conditions: [{ type: 'Succeeded', status: 'True' }] },
        },
      ],
    },
  },
  {
    propsReferenceForRuns: ['apple1Runs', 'apple2Runs'],
    apple1Runs: {
      data: [
        {
          apiVersion: 'tekton.dev/v1alpha1',
          kind: 'Pipeline',
          metadata: {
            creationTimestamp: '2019-05-30T10:33:14Z',
            generation: 1,
            name: 'simple-pipeline-run-1',
            namespace: 'tekton-pipelines',
            resourceVersion: '345586',
            selfLink:
              '/apis/tekton.dev/v1alpha1/namespaces/tekton-pipelines/pipelines/simple-pipeline',
            uid: '7f06aeb0-838f-11e9-8282-525400bab8f1',
          },
        },
        {
          apiVersion: 'tekton.dev/v1alpha1',
          kind: 'Pipeline',
          metadata: {
            creationTimestamp: '2019-05-31T10:33:14Z',
            generation: 1,
            name: 'voting-deploy-pipeline',
            namespace: 'tekton-pipelines',
            resourceVersion: '345587',
            selfLink:
              '/apis/tekton.dev/v1alpha1/namespaces/tekton-pipelines/pipelines/voting-deploy-pipeline',
            uid: '7f07d2c1-838f-11e9-8282-525400bab8f1',
          },
        },
      ],
    },
    apple2Runs: {
      data: [
        {
          apiVersion: 'abhiapi/v1',
          kind: 'PipelineRun',
          metadata: { name: 'apple-2-run1', creationTimestamp: '31-04-2019' },
          status: { conditions: [{ type: 'Succeeded', status: 'True' }] },
        },
      ],
    },
  },
];

export const extendedProps: ExtendedPipelineAugmentRunsPropsWith[] = [
  { ...listProps[2], ...additionalProps[2] },
  { ...listProps[3], ...additionalProps[3] },
];

export const actionPipelines: Pipeline[] = [
  {
    apiVersion: 'abhiapi/v1',
    kind: 'Pipeline',
    metadata: { name: 'sansa-stark', namespace: 'corazon' },
  },
  {
    apiVersion: 'abhiapi/v1',
    kind: 'Pipeline',
    metadata: { name: 'danaerys-targaeryen', namespace: 'corazon' },
  },
];

export const actionPipelineRuns: PipelineRun[] = [
  {
    apiVersion: 'abhiapi/v1',
    kind: 'PipelineRun',
    metadata: { name: 'winterfell', namespace: 'corazon' },
    status: { creationTimestamp: '31', conditions: [{ type: 'Succeeded', status: 'True' }] },
  },
  {
    apiVersion: 'abhiapi/v1',
    kind: 'Pipeline',
    metadata: { name: 'dragonstone', namespace: 'corazon' },
    status: { creationTimestamp: '31', conditions: [{ type: 'Succeeded', status: 'Unknown' }] },
  },
];
