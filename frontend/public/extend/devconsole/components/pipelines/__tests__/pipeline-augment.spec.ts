/*eslint-disable no-unused-vars */
import {
  getResources,
  augmentRunsToData,
  getLatestRun,
  PipelineAugmentRunsProps,
  PipelineListProps,
  Runs,
} from '../../../utils/pipeline-augment';

interface ExtendedPipelineAugmentRunsPropsWith extends PipelineAugmentRunsProps {
  apple1Runs?: Runs;
  apple2Runs?: Runs;
}
const listProps: PipelineListProps[] = [
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
const additionalProps = [
  {},
  {},
  {
    propsReferenceForRuns: ['apple1Runs'],
    apple1Runs: { data: [] },
  },
  {
    propsReferenceForRuns: ['apple1Runs', 'apple2Runs'],
    apple1Runs: { data: [] },
    apple2Runs: { data: [] },
  },
];

const extendedProps: ExtendedPipelineAugmentRunsPropsWith[] = [
    additionalProps.forEach((additional,i)=>
        extendedProps.push({...listProps[i],...additional})
    )

describe('1. PipelineAugment test getResources create correct resources for firehose', () => {
  it('1. expect resources to be null for no data', () => {
    const resources = getResources(listProps[0]);
    expect(resources.resources).toBe(null);
    expect(resources.propsReferenceForRuns).toBe(null);
  });
  it('2. expect resources to be null for empty data array', () => {
    const resources = getResources(listProps[1]);
    expect(resources.resources).toBe(null);
    expect(resources.propsReferenceForRuns).toBe(null);
  });
  it('3. expect resources to be of length 1 and have the following properties & childprops', () => {
    const resources = getResources(listProps[2]);
    expect(resources.resources.length).toBe(1);
    expect(resources.resources[0].kind).toBe('PipelineRun');
    expect(resources.resources[0].namespace).toBe(listProps[2].data[0].metadata.namespace);
    expect(resources.propsReferenceForRuns.length).toBe(1);
  });
  it('4. expect resources to be of length 2 and have the following properties & childprops', () => {
    const resources = getResources(listProps[3]);
    expect(resources.resources.length).toBe(2);
    expect(resources.resources[0].kind).toBe('PipelineRun');
    expect(resources.resources[1].kind).toBe('PipelineRun');
    expect(resources.resources[0].namespace).toBe(listProps[3].data[0].metadata.namespace);
    expect(resources.resources[0].namespace).toBe(listProps[3].data[1].metadata.namespace);
    expect(resources.propsReferenceForRuns.length).toBe(2);
  });
});

describe('2. PipelineAugment test augmentRunsToData augments latest run details to data to be passed to List component', () => {
  it('3. expect resources to be of length 2 and have the following properties', () => {
    const data = augmentRunsToData(extendedProps[2]);
    expect(data.length).toBe(1);
    expect(data[0].latestRun).toBeTruthy();
    const latestRunFromProps = getLatestRun(
      extendedProps[2]['apple1Run'].data,
      'creationTimeStamp',
    );
    expect(data[0].latestRun.metadata.name).toBe(latestRunFromProps.metadata.name);
  });
  /*it('expect resources to be of length 2 and have the following properties', () => {
    const data = augmentRunsToData(extendedProps[1]);
    expect(data.length).toBe(2);
    expect(data[0].latestRun).toBeTruthy();
    expect(data[1].latestRun).toBeTruthy();
    const latestRunFromProps1 = getLatestRun(additionalProps[1][additionalProps[0].propsReferenceForRuns[1]].data,'creationTimeStamp');
    expect(data[0].latestRun.metadata.name).toBe(latestRunFromProps1.metadata.name);
    const latestRunFromProps1 = getLatestRun(additionalProps[1][additionalProps[1].propsReferenceForRuns[1]].data,'creationTimeStamp');
    expect(data[1].latestRun.metadata.name).toBe(latestRunFromProps1.metadata.name);
  });*/
});
