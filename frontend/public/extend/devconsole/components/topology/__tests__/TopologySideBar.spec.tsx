/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { TopologyDataObject } from './../topology-types';
import SideBar, { TopologySideBarProps } from './../TopologySideBar';

describe('TopologySideBar:', () => {
  const TopologyLayout = () => <h1>Topology Layout</h1>;

  let props = {
    selected: 'aaa',
    item: {
      resources: [
        {kind: "DeploymentConfig"},
        {kind: "Route"},
        {kind: "Service"}
      ]
    } as TopologyDataObject,
    onClose: () => ''
  } as TopologySideBarProps;

  let wrapper: ShallowWrapper<TopologySideBarProps>;

  beforeEach(() => {
    wrapper = shallow(<SideBar {...props} />);
  });

  it('renders a SideBar', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  xit('clicking on close button should call the onClose callback function', () => {
    let onClose = jest.fn()
    wrapper = shallow(<SideBar selected={'a'} item={props.item} onClose={onClose} />)
    wrapper.find('CloseButton[data-test-id="sidebar-close-button"]').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});