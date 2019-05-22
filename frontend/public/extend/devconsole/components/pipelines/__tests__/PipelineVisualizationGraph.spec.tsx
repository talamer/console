/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as Renderer from 'react-test-renderer';
import { PipelineVisualizationGraph } from '../PipelineVisualizationGraph';
import { PipelineVisualizationProps } from '../PipelineVisualization';
import { mockPipelineGraph } from '../__mocks__/PipelineMocks';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
  createPortal: (node) => node,
}));

jest.mock('../PipelineVisualizationTask');
describe('PipelineVisualizationGraph', () => {
  const props = {
    namespace: 'test',
    graph: mockPipelineGraph,
  };
  let wrapper: ShallowWrapper<PipelineVisualizationProps>;
  beforeEach(() => {
    wrapper = shallow(<PipelineVisualizationGraph {...props} />);
  });

  it('renders a Pipeline visualization graph', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should contain right number of stages', () => {
    const noOfStages = wrapper.find('.odc-pipeline-vis-graph__stage-column').length;

    expect(noOfStages).toEqual(mockPipelineGraph.length);
  });

  it('should match the previous snapshot', () => {
    const tree = Renderer.create(<PipelineVisualizationGraph {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
