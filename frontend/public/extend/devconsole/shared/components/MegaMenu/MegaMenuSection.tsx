import * as React from 'react';
import { NavGroup } from '@patternfly/react-core';
import './MegaMenu.scss';

interface MegaMenuSectionProps {
  title: string,
  children: any
}

function MegaMenuSection(props: MegaMenuSectionProps) {
  return (
    <NavGroup 
      title={props.title}
      className="odc-mega-menu__group-separator">
      {props.children}
    </NavGroup>
  );
}

export default MegaMenuSection;