/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NavItem } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import './MegaMenuItem.scss';

interface MegaMenuItemProps {
  to: string;
  onClick?: (MouseEvent) => void;
  icon: string | React.ReactNode;
  title: string;
  externalLink?: boolean;
  isActive?: () => boolean;
}


const MegaMenuItem: React.FunctionComponent<MegaMenuItemProps> = (props: MegaMenuItemProps) => (
  <NavItem className="odc-mega-menu-item">
    <NavLink
      to={props.to}
      onClick={props.onClick}
      isActive={props.isActive}
      activeClassName="pf-m-current"
      target={props.externalLink ? '_blank' : ''}>
      {typeof props.icon === 'string' ?
        <img
          src={props.icon}
          alt={props.title}
          className="odc-mega-menu-item__icon"
        />
        : <span className="odc-mega-menu-item__icon"> {props.icon} </span>
      }
      {props.title}
      {props.externalLink ? <i className="fa fa-external-link odc-mega-menu-item__external-link"></i> : ''}
    </NavLink>
  </NavItem>
);

export default MegaMenuItem;
