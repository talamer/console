/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';
import { Defs, DefsState } from '../SvgDefsProvider';

describe('Defs', () => {
  it('should render initially empty', () => {
    const wrapper = shallow(<Defs />);
    expect(wrapper.find('defs').exists()).toBeFalsy();
  });

  it('should render defs', () => {
    const wrapper = shallow<{}, DefsState>(<Defs />);
    const state: DefsState = {
      defs: {
        first: { count: 0, node: <span /> },
        second: { count: 0, node: <span /> },
      },
    };
    wrapper.setState(state);
    const defsWrapper = wrapper.find('defs');
    expect(
      defsWrapper
        .childAt(0)
        .first()
        .props().children,
    ).toBe(state.defs.first.node);
    expect(
      defsWrapper
        .childAt(1)
        .first()
        .props().children,
    ).toBe(state.defs.second.node);
  });
});
