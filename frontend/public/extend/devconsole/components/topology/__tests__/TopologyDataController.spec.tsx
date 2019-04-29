/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import TopologyDataController, { TopologyDataControllerProps } from '../TopologyDataController';
import { resources } from '../__mocks__/TopologyDataMocks';
import { renderTopology } from '../../../pages/Topology';
import ODCEmptyState from '../../../shared/components/EmptyState/EmptyState';

describe('TopologyDataController', () => {

  const props = {
    namespace: 'test',
    resources,
    // eslint-disable-next-line react/display-name
    render: renderTopology,
  };
  let wrapper: ShallowWrapper<TopologyDataControllerProps>;
  beforeEach(() => {
    wrapper = shallow(<TopologyDataController namespace="namespace" {...props} />);
  });

  it('renders a topologyDataController', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the empty state component', () => {
    expect(wrapper.find(<ODCEmptyState title="Topology"  />)).toBeTruthy();
  });
});
