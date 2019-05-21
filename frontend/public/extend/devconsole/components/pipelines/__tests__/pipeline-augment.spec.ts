/*eslint-disable no-unused-vars, no-undef */
import { getResources, augmentRunsToData } from '../../../utils/pipeline-augment';
import {
  listProps,
  additionalProps,
  extendedProps,
} from '../../__mocks__/pipelines/pipeline-augment-mocks';

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

describe('2. PipelineAugment test gcorrect data is augmented', () => {
  it('1. expect additional resources to be correctly added using augmentRunsToData', () => {
    const newData = augmentRunsToData(extendedProps[0]);
    expect(newData.length).toBe(1);
    expect(newData[0].latestRun.metadata.name).toBe(
      additionalProps[2].apple1Runs.data[0].metadata.name,
    );
  });
  it('2. expect additional resources to be added using latest run', () => {
    const newData = augmentRunsToData(extendedProps[1]);
    expect(newData.length).toBe(2);
    expect(newData[0].latestRun.metadata.name).toBe(
      additionalProps[3].apple1Runs.data[1].metadata.name,
    );
    expect(newData[1].latestRun.metadata.name).toBe(
      additionalProps[3].apple2Runs.data[0].metadata.name,
    );
  });
});
