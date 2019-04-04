/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Nav } from '@patternfly/react-core';

interface MegaMenuNavProps {
  onSelect: (MouseEvent) => void;
  onToggle?: () => void;
  children: any;
}

const MegaMenuNav: React.FunctionComponent<MegaMenuNavProps> = (props: MegaMenuNavProps) => (
  <Nav
    onSelect={props.onSelect}
    aria-label="Mega Menu Nav"
    onToggle={props.onToggle}>
    {props.children}
  </Nav>
);

export default MegaMenuNav;
