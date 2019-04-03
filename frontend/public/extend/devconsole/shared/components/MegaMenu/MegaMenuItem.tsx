import * as React from 'react';
import { NavItem } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import './MegaMenuItem.scss';

interface MegaMenuItemProps {
  to: string,
  icon: string,
  title: string,
  externalLink?: boolean
}

const MegaMenuItem: React.FunctionComponent<MegaMenuItemProps> = (props: MegaMenuItemProps) => (
  <NavItem className="odc-mega-menu-item">
    <NavLink
      to={props.to}
      activeClassName="pf-m-current"
      target={props.externalLink ? "_blank" : ""}>
      <img 
        src={props.icon} 
        alt={props.title} 
        className="odc-mega-menu-item__icon"/>  
        {props.title}
      {props.externalLink ? <i className="fa fa-external-link odc-mega-menu-item__external-link"></i> : ""}
    </NavLink>
  </NavItem>
);

export default MegaMenuItem;