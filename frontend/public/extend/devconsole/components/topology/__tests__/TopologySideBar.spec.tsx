/* eslint-disable no-unused-vars no-undef */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TopologyDataObject } from './../topology-types';
import SideBar, { TopologySideBarProps } from './../TopologySideBar';
import { CloseButton } from '../../../../../components/utils';

describe('TopologySideBar:', () => {

  const props = {
    selected: 'aaa',
    item: {
      resources: [{ kind: 'DeploymentConfig' }, { kind: 'Route' }, { kind: 'Service' }],
    } as TopologyDataObject,
    onClose: () => '',
  } as TopologySideBarProps;

  let wrapper: ShallowWrapper<TopologySideBarProps>;

  beforeEach(() => {
    wrapper = shallow(<SideBar {...props} />);
  });

  it('renders a SideBar', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('clicking on close button should call the onClose callback function', () => {
    const onClose = jest.fn();
    wrapper = shallow(<SideBar selected={'a'} item={props.item} onClose={onClose} />);
    wrapper.find(CloseButton).shallow().find('button').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
