/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';
import { Backdrop } from '@patternfly/react-core';
import MegaMenu from '../MegaMenu/MegaMenu';

describe('MegaMenu', () => {
  it('should be close when is isNavOpen is set to false', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={false} />);
    expect(menuWrapper.childAt(0).props().className).toEqual('odc-mega-menu ');
  });

  it('should be open when is isNavOpen is set to true', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={true} />);
    expect(menuWrapper.childAt(1).props().className).toEqual('odc-mega-menu is-open');
  });

  it('should not apply backdrop when menu is close', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={false} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(false);
  });

  it('should apply backdrop when menu is open', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={true} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(true);
  });
});
