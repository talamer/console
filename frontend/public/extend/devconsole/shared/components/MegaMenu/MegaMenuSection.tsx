import * as React from 'react';
import { NavGroup } from '@patternfly/react-core';
import './MegaMenuSection.scss';

interface MegaMenuSectionProps {
  title?: string,
  children: React.ReactNode
}

function MegaMenuSection(props: MegaMenuSectionProps) {
  return (
    <NavGroup 
      title={props.title}
      className="odc-mega-menu-section__separator">
      {props.children}
    </NavGroup>
  );
}

export default MegaMenuSection;