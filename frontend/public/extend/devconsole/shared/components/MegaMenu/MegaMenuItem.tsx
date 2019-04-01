import * as React from 'react';
import { NavItem } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import './MegaMenu.scss';

interface MegaMenuItemProps {
  to: string;
  onClick?: (MouseEvent) => void;
  icon: string;
  title: string;
  externalLink?: boolean;
  isActive?: () => boolean;
}

function MegaMenuItem(props: MegaMenuItemProps) {
  return (
    <NavItem className="odc-mega-menu__item">
      <NavLink
        to={props.to}
        onClick={props.onClick}
        isActive={props.isActive}
        activeClassName="pf-m-current"
        target={props.externalLink ? "_blank" : ""}>
        <img 
          src={props.icon} 
          alt={props.title} 
          className="odc-mega-menu__item-icon"/>  
          {props.title}
        {props.externalLink ? <i className="fa fa-external-link odc-mega-menu__external-link"></i> : ""}
      </NavLink>
    </NavItem>
  );
}

export default MegaMenuItem;