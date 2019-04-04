import * as React from 'react';
import './MegaMenu.scss';

interface MegaMenuProps {
  children: React.ReactNode;
  isNavOpen: boolean;
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = (props: MegaMenuProps) => (
  <React.Fragment>
    <div
      className={props.isNavOpen ? "odc-mega-menu__expanded" : "odc-mega-menu__collapsed"}>
      {props.children}
    </div>
    {props.isNavOpen ? <div className="odc-ps__backdrop"/> : ''}
  </React.Fragment>
);

export default MegaMenu;