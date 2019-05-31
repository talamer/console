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
          metadata: { name: 'apple-1-run1' },
          status: { creationTimeStamp: '21', conditions: [{ type: 'Succeeded', status: 'True' }] },
        },
      ],
    },
  },
  {
    propsReferenceForRuns: ['apple1Runs', 'apple2Runs'],
    apple1Runs: {
      data: [
        {
          apiVersion: 'abhiapi/v1',
          kind: 'PipelineRun',
          metadata: { name: 'apple-1-run1' },
          status: { creationTimeStamp: '21', conditions: [{ type: 'Succeeded', status: 'True' }] },
        },
        {
          apiVersion: 'abhiapi/v1',
          kind: 'PipelineRun',
          metadata: { name: 'apple-1-run2' },
          status: { creationTimeStamp: '31', conditions: [{ type: 'Succeeded', status: 'True' }] },
        },
      ],
    },
    apple2Runs: {
      data: [
        {
          apiVersion: 'abhiapi/v1',
          kind: 'PipelineRun',
          metadata: { name: 'apple-2-run1' },
          status: { creationTimeStamp: '31', conditions: [{ type: 'Succeeded', status: 'True' }] },
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
    status: { creationTimeStamp: '31', conditions: [{ type: 'Succeeded', status: 'True' }] },
  },
  {
    apiVersion: 'abhiapi/v1',
    kind: 'Pipeline',
    metadata: { name: 'dragonstone', namespace: 'corazon' },
    status: { creationTimeStamp: '31', conditions: [{ type: 'Succeeded', status: 'Unknown' }] },
  },
];
