/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Backdrop } from '@patternfly/react-core';
import MegaMenu from '../MegaMenu/MegaMenu';

describe('MegaMenu', () => {
  it('should be close when isNavOpen is set to false', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={false} onClose={() => {}} />);
    expect(menuWrapper.childAt(0).props().className).toEqual('odc-mega-menu ');
  });

  it('should be open when isNavOpen is set to true', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={true} onClose={() => {}} />);
    expect(menuWrapper.childAt(1).props().className).toEqual('odc-mega-menu is-open');
  });

  it('should not apply backdrop when menu is close', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={false} onClose={() => {}} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(false);
  });

  it('should apply backdrop when menu is open', () => {
    const menuWrapper = shallow(<MegaMenu isNavOpen={true} onClose={() => {}} />);
    expect(menuWrapper.find(Backdrop).exists()).toEqual(true);
  });

  it('should close the switcher when clicked outside', () => {
    const map: any = {};

    const div = document.createElement('div');

    document.addEventListener = (event, cb) => {
      map[event] = cb;
    };

    const onClose = jest.fn();
    const menuWrapper = mount(
      <div>
        <MegaMenu isNavOpen={true} onClose={onClose} />
        <div className="test-class" />
      </div>,
      { attachTo: div },
    );

    menuWrapper.find('.test-class').simulate('click');

    map.click({ target: menuWrapper.find('.test-class').instance() });
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close switcher when clicked on it', () => {
    const map: any = {};
    const div = document.createElement('div');

    document.addEventListener = (event, cb) => {
      map[event] = cb;
    };

    const onClose = jest.fn();
    const menuWrapper = mount(<MegaMenu isNavOpen={true} onClose={onClose} />, {
      attachTo: div,
    });

    menuWrapper.find('.odc-mega-menu').simulate('click');

    map.click({ target: menuWrapper.find('.odc-mega-menu').instance() });
    expect(onClose).not.toHaveBeenCalled();
  });
});
