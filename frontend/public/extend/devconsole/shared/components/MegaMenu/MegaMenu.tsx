import * as React from 'react';
import './MegaMenu.scss';

interface MegaMenuProps {
  children: React.ReactNode;
  isNavOpen: boolean;
}

function MegaMenu(props: MegaMenuProps) {
  return (
    <div
      className={props.isNavOpen ? "odc-mega-menu__expanded" : "odc-mega-menu__collapsed"}>
      {props.children}
    </div>
  );
}

export default MegaMenu;