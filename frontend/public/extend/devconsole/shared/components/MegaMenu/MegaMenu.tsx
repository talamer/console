/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Backdrop } from '@patternfly/react-core';
import './MegaMenu.scss';

export interface MegaMenuProps {
  children?: React.ReactNode;
  isNavOpen: boolean;
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = (props: MegaMenuProps) => (
  <React.Fragment>
    {props.isNavOpen && <Backdrop style={{ position: 'absolute', zIndex: 100 }} />}
    <div className={`odc-mega-menu ${props.isNavOpen ? 'is-open' : ''}`}>{props.children}</div>
  </React.Fragment>
);

export default MegaMenu;
