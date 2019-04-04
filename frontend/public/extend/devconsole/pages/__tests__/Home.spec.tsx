import * as React from 'react';
import Home from '../Home';
import { shallow } from 'enzyme';

describe('throwaway test', () => {
  it('component should exist', () => {
    const homeComponent = shallow(<Home />);
    expect(homeComponent.exists()).toEqual(true);
  });
});
