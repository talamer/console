/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Nav } from '@patternfly/react-core';

export interface MegaMenuNavProps {
  onSelect: (MouseEvent) => void;
  children: any;
}

const MegaMenuNav: React.FunctionComponent<MegaMenuNavProps> = (props: MegaMenuNavProps) => (
  <Nav onSelect={props.onSelect} aria-label="Applications">
    {props.children}
  </Nav>
);

export default MegaMenuNav;
