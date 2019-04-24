/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TopologyDataController, TopologyDataProps } from '../topology/TopologyDataController';
import { resources, topologyData } from '../__mocks__/TopologyDataMocks';

describe('TopologyDataController', () => {
  const TopologyLayout = () => <h1>Topology Layout</h1>;

  const props = {
    namespace: 'test',
    resources,
    render: (props) => <TopologyLayout {...props} />,
  };
  let wrapper: ShallowWrapper<TopologyDataProps>;
  beforeEach(() => {
    wrapper = shallow(<TopologyDataController namespace="namespace" {...props} />);
  });

  it('renders a topologyDataController', () => {
    expect(wrapper.exists()).toBeTruthy;
  });

  it('should render the topology Layout', () => {
    expect(wrapper.equals(<TopologyLayout />)).toBeTruthy;
  });

  it('should render the topology Layout with topology graph data', () => {
    expect(wrapper.find(TopologyLayout).props()).toEqual({ topologyGraphData: topologyData });
  });
});
