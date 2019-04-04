/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './MegaMenu.scss';

interface MegaMenuProps {
  children: React.ReactNode;
  isNavOpen: boolean;
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = (props: MegaMenuProps) => (
  <React.Fragment>
    <div
      className={`odc-mega-menu ${props.isNavOpen ? 'is-open' : ''}`}>
      {props.children}
    </div>
    {props.isNavOpen ? <div className="odc-ps__backdrop" /> : ''}
  </React.Fragment>
);

export default MegaMenu;
