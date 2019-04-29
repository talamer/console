/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TopologyDataController, { TopologyDataControllerProps } from '../TopologyDataController';
import { resources } from '../__mocks__/TopologyDataMocks';

describe('TopologyDataController', () => {
  const TopologyLayout = () => <h1>Topology Layout</h1>;

  const props = {
    namespace: 'test',
    resources,
    // eslint-disable-next-line react/display-name
    render: (p) => <TopologyLayout {...p} />,
  };
  let wrapper: ShallowWrapper<TopologyDataControllerProps>;
  beforeEach(() => {
    wrapper = shallow(<TopologyDataController namespace="namespace" {...props} />);
  });

  it('renders a topologyDataController', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  // it('should render the topology Layout', () => {
  //   expect(wrapper.equals(<TopologyLayout />)).toBeTruthy();
  // });

  // it('should render the topology Layout with topology graph data', () => {
  //   expect(wrapper.find(TopologyLayout).props()).toEqual({ topologyGraphData: topologyData });
  // });
});
