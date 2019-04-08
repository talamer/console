/* eslint-disable no-unused-vars */
import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Map as ImmutableMap } from 'immutable';
import ConnectedPerspectiveLink from '../PerspectiveLink';
import { getStoreTypedComponent } from '../../../utils/test-utils';

describe('ConnectedPerspectiveLink', () => {
  const mockStore = configureMockStore();
  const ConnectedComponent = getStoreTypedComponent(ConnectedPerspectiveLink);

  it('should pass activePerspective from state as prop', () => {
    const store = mockStore({
      UI: ImmutableMap({
        activePerspective: 'dev',
      }),
    });
    const connectedLinkWrapper = shallow(
      <ConnectedComponent
        store={store}
        to="test-link"
      />,
    );
    expect(connectedLinkWrapper.props().activePerspective).toBe('dev');
    expect(connectedLinkWrapper.props().to).toBe('test-link');
  });
});
