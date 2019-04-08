/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import './MegaMenuItem.scss';

export interface MegaMenuItemProps {
  to: string;
  onClick?: (MouseEvent) => void;
  icon: string | React.ReactNode;
  title: string;
  externalLink?: boolean;
  isActive?: () => boolean;
}

const MegaMenuItem: React.FunctionComponent<MegaMenuItemProps> = (props: MegaMenuItemProps) => (
  <NavItem className="odc-mega-menu-item" onClick={props.onClick}>
    <NavLink
      to={props.to}
      isActive={props.isActive}
      activeClassName="pf-m-current"
      target={props.externalLink ? '_blank' : ''}
    >
      {typeof props.icon === 'string' ? (
        <img src={props.icon} alt={props.title} className="odc-mega-menu-item__icon" />
      ) : (
        <span className="odc-mega-menu-item__icon"> {props.icon} </span>
      )}
      {props.title}
      {props.externalLink && (
        <span className="odc-mega-menu-item__external-link">
          <ExternalLinkAltIcon />
        </span>
      )}
    </NavLink>
  </NavItem>
);

export default MegaMenuItem;
