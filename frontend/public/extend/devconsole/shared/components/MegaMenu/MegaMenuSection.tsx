/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NavGroup } from '@patternfly/react-core';
import './MegaMenuSection.scss';

export interface MegaMenuSectionProps {
  title?: string;
  children: React.ReactNode;
}

const MegaMenuSection: React.FunctionComponent<MegaMenuSectionProps> = (
  props: MegaMenuSectionProps,
) => (
  <NavGroup title={props.title || ''} className="odc-mega-menu-section__separator">
    {props.children}
  </NavGroup>
);

export default MegaMenuSection;
