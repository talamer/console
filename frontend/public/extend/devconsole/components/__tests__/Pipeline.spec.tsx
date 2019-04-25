/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow } from 'enzyme';
import { ListPage } from '../../../../components/factory';
import PipelinePage from '../../pages/Pipelines';
import PipelineRuns from '../pipelines/PipelineRuns';

const pipelinePageProps = {
  namespace: 'all-namespaces',
};

const pipelineRunProps = {
  obj: {
    metadata: {
      name: 'pipeline-a',
    },
  },
};

const pipelineWrapper = shallow(<PipelinePage {...pipelinePageProps} />);
const pipelineRunWrapper = shallow(<PipelineRuns {...pipelineRunProps} />);

describe('Pipeline List', () => {
  it('Renders a list', () => {
    expect(pipelineWrapper.exists()).toBe(true);
    expect(pipelineWrapper.find(ListPage).exists());
  });

  it('List renders Pipeline resources', () => {
    expect(pipelineWrapper.exists()).toBe(true);
    expect(pipelineWrapper.find(ListPage).prop('kind')).toMatch('Pipeline');
  });
});

describe('Pipeline Run List', () => {
  it('Renders a list', () => {
    expect(pipelineRunWrapper.exists()).toBe(true);
    expect(pipelineRunWrapper.find(ListPage).exists());
  });

  it('List renders PipelineRun resources', () => {
    expect(pipelineRunWrapper.exists()).toBe(true);
    expect(pipelineRunWrapper.find(ListPage).prop('kind')).toMatch('PipelineRun');
  });
});
