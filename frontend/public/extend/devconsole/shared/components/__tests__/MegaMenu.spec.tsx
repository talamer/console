/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import MegaMenu from '../MegaMenu/MegaMenu';
import { Backdrop } from '@patternfly/react-core';

describe('MegaMenu', () => {
  let menuWrapper: ShallowWrapper<any> = null;

  it('should be open when is isNavOpen is set to true', () => {
    menuWrapper = shallow(<MegaMenu isNavOpen={false} onClose={() => {}} />);
    expect(menuWrapper.childAt(0).props().className).toEqual('odc-mega-menu ');

    menuWrapper = shallow(<MegaMenu isNavOpen={true} onClose={() => {}} />);
    expect(menuWrapper.childAt(1).props().className).toEqual('odc-mega-menu is-open');
  });

  it('should apply backdrop when switcher is open', () => {
    menuWrapper = shallow(<MegaMenu isNavOpen={false} onClose={() => {}} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(false);

    menuWrapper = shallow(<MegaMenu isNavOpen={true} onClose={() => {}} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(true);
  });
});
