/* eslint-disable no-unused-vars no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';
import { TopologyDataObject } from './../topology-types';
import SideBar, { TopologySideBarProps } from './../TopologySideBar';
import { CloseButton } from '../../../../../components/utils';

describe('TopologySideBar:', () => {

  const props = {
    show: true,
    item: {
      resources: [{ kind: 'DeploymentConfig' }, { kind: 'Route' }, { kind: 'Service' }],
    } as TopologyDataObject,
    onClose: () => '',
  } as TopologySideBarProps;

  it('renders a SideBar', () => {
    const wrapper = shallow(<SideBar {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('clicking on close button should call the onClose callback function', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<SideBar show item={props.item} onClose={onClose} />);
    wrapper.find(CloseButton).shallow().find('button').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
