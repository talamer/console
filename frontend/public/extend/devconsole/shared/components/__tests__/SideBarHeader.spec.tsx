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
    expect(
      shallowSideBar.contains(
        <React.Fragment>
          <CodeIcon /> Developer
        </React.Fragment>,
      ),
    ).toEqual(true);
  });

  it('should show Administrator header when active perspective is admin', () => {
    mockServerFlags({ kubeAPIServerURL: 'https://api.rohit32.devcluster.openshift.com:6443' });
    const shallowSideBar = shallow(<SideBarHeader activePerspective={'admin'} />);
    expect(
      shallowSideBar.contains(
        <React.Fragment>
          <CogsIcon /> Administrator
        </React.Fragment>
      ),
    ).toEqual(true);
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
