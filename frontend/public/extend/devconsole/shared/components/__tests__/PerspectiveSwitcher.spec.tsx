/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import { UIActions } from '../../../../../ui/ui-actions';
import ConnectedPerspectiveSwitcher, { PerspectiveSwitcher } from '../PerspectiveSwitcher';
import { getStoreTypedComponent } from '../../../utils/test-utils';
import MegaMenu from '../MegaMenu/MegaMenu';

describe('PerspectiveSwitcher', () => {
  it('renders perspective switcher menu', () => {
    const switcherWrapper = shallow(
      <PerspectiveSwitcher
        isNavOpen={false}
        activePerspective="dev"
        onClose={() => {}}
        flags={{ SHOW_DEV_CONSOLE: true }}
        onPerspectiveChange={() => {}}
      />,
    );
    expect(switcherWrapper.find(MegaMenu).length).toEqual(1);
  });

  it('should not be available when dev console is disabled', () => {
    const switcherWrapper = shallow(
      <PerspectiveSwitcher
        isNavOpen={true}
        activePerspective="admin"
        onClose={() => {}}
        flags={{ SHOW_DEV_CONSOLE: false }}
        onPerspectiveChange={() => {}}
      />,
    );
    expect(switcherWrapper.find(MegaMenu).exists()).toBeFalsy();
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
        onClose={() => {}}
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
        onClose={() => {}}
      />,
    );

    expect(store.getActions()).toEqual([]);
    connectedSwitcherWrapper.props().onPerspectiveChange('admin');
    expect(store.getActions()).toEqual([UIActions.setActivePerspective('admin')]);
  });
});
