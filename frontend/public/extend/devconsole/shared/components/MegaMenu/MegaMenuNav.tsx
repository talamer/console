import * as React from 'react';
import { Nav } from '@patternfly/react-core';

interface MegaMenuNavProps {
  onSelect: (MouseEvent) => void,
  onToggle?: () => void 
  children: any
}

function MegaMenuNav(props: MegaMenuNavProps) {
  return (
    <Nav 
      onSelect={props.onSelect}
      aria-label="Mega Menu Nav"
      onToggle={props.onToggle}>
      {props.children}
    </Nav>
  )
}

export default MegaMenuNav;