/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Modal } from '@patternfly/react-core';
import configureMockStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import { UIActions } from '../../../../../ui/ui-actions';
import ConnectedPerspectiveSwitcher, { PerspectiveSwitcher } from '../PerspectiveSwitcher';
import { getStoreTypedComponent } from '../../../utils/test-utils';

describe('PerspectiveSwitcher', () => {
  let switcherWrapper: ShallowWrapper<any> = null;

  it('renders perspective switcher menu and it should be closed initially', () => {
    switcherWrapper = shallow(
      <PerspectiveSwitcher
        isNavOpen={false}
        activePerspective="dev"
        onNavToggle={() => {}}
        flags={{ SHOW_DEV_CONSOLE: true }}
        onPerspectiveChange={() => {}}
      />,
    );
    expect(switcherWrapper.find(Modal).length).toEqual(1);
    expect(switcherWrapper.find(Modal).prop('isOpen')).toEqual(false);
  });

  it('should be open when is isNavOpen is set to true', () => {
    switcherWrapper = shallow(
      <PerspectiveSwitcher
        isNavOpen={true}
        activePerspective="admin"
        onNavToggle={() => {}}
        flags={{ SHOW_DEV_CONSOLE: true }}
        onPerspectiveChange={() => {}}
      />,
    );
    expect(switcherWrapper.find(Modal).prop('isOpen')).toEqual(true);
  });

  it('should not be available when dev console is disabled', () => {
    switcherWrapper = shallow(
      <PerspectiveSwitcher
        isNavOpen={true}
        activePerspective="admin"
        onNavToggle={() => {}}
        flags={{ SHOW_DEV_CONSOLE: false }}
        onPerspectiveChange={() => {}}
      />,
    );
    expect(switcherWrapper.find(Modal).exists()).toBeFalsy();
  });
});

describe('ConnectedPerspectiveSwitcher', () => {
  const mockStore = configureMockStore();
  const ConnectedComponent = getStoreTypedComponent(ConnectedPerspectiveSwitcher);

  it('should pass activePerspective from state as prop', () => {
    const store = mockStore({
      UI: ImmutableMap({
        activePerspective: 'dev',
      }),
    });
    const connectedSwitcherWrapper = shallow(
      <ConnectedComponent
        store={store}
        flags={{ SHOW_DEV_CONSOLE: true }}
        isNavOpen={true}
        onNavToggle={() => {}}
      />,
    );
    expect(connectedSwitcherWrapper.props().activePerspective).toBe('dev');
  });

  it('should dispatch action to change active perspective', () => {
    const store = mockStore({
      UI: ImmutableMap({
        activePerspective: 'dev',
      }),
    });
    const connectedSwitcherWrapper = shallow(
      <ConnectedComponent
        store={store}
        flags={{ SHOW_DEV_CONSOLE: true }}
        isNavOpen={true}
        onNavToggle={() => {}}
      />,
    );

    expect(store.getActions()).toEqual([]);
    connectedSwitcherWrapper.props().onPerspectiveChange('admin');
    expect(store.getActions()).toEqual([UIActions.setActivePerspective('admin')]);
  });
});
