import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import ConnectedSideBarHeader, { SideBarHeader } from '../SideBarHeader';
import { mockServerFlags, getStoreTypedComponent } from '../../../utils/test-utils';
import { CodeIcon, CogsIcon } from '@patternfly/react-icons';

describe('SideBarHeader Tests: ', () => {
  it('should exists', () => {
    mockServerFlags({ kubeAPIServerURL: 'https://api.rohit32.devcluster.openshift.com:6443' });
    const shallowSideBar = shallow(<SideBarHeader activePerspective={'dev'} />);
    expect(shallowSideBar.exists()).toBe(true);
  });

  it('should show Developer header when active perspective is dev', () => {
    mockServerFlags({ kubeAPIServerURL: 'https://api.rohit32.devcluster.openshift.com:6443' });
    const shallowSideBar = shallow(<SideBarHeader activePerspective={'dev'} />);
    expect(shallowSideBar.find(CodeIcon)).toHaveLength(1);
    expect(shallowSideBar.find(CogsIcon)).toHaveLength(0);
  });

  it('should show Administrator header when active perspective is admin', () => {
    mockServerFlags({ kubeAPIServerURL: 'https://api.rohit32.devcluster.openshift.com:6443' });
    const shallowSideBar = shallow(<SideBarHeader activePerspective={'admin'} />);
    expect(shallowSideBar.find(CodeIcon)).toHaveLength(0);
    expect(shallowSideBar.find(CogsIcon)).toHaveLength(1);
  });

  it('connectedSideBarHeader should pass activePerspective as prop', () => {
    const mockStore = configureMockStore();
    const ConnectedComponent = getStoreTypedComponent(ConnectedSideBarHeader);
    const store = mockStore({
      UI: ImmutableMap({
        activePerspective: 'dev',
      }),
    });
    const shallowConnectedComponent = shallow(<ConnectedComponent store={store} />);
    expect(shallowConnectedComponent.props().activePerspective).toBe('dev');
  });
});
