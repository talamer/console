import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import { shallow } from 'enzyme';
import ConnectedEmptyStateComponent from '../EmptyState/EmptyState';
import { getStoreTypedComponent } from '../../../utils/test-utils';

describe('EmptyState', () => {
  const mockStore = configureMockStore();
  const ConnectedComponent = getStoreTypedComponent(ConnectedEmptyStateComponent);

  it('should pass activeNamespace from state as prop', () => {
    const store = mockStore({
      UI: ImmutableMap({
        activeNamespace: 'project',
      }),
    });

    const topologyWrapper = shallow(<ConnectedComponent store={store} />);

    expect(topologyWrapper.props().resources).toEqual('project');
  });

  it('should pass resources from state as prop', () => {
    const store = mockStore({
      UI: ImmutableMap({
        activePerspective: 'dev',
      }),
    });

    const topologyWrapper = shallow(<ConnectedComponent store={store} />);

    expect(topologyWrapper.props().resources).toEqual('dev');
  });
});
