/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, NavList, PageSidebar, NavItem } from '@patternfly/react-core';
import { HrefLink, NavSection } from '../../../components/nav';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  location: string;
  onNavSelect: () => void;
  onToggle: () => void;
}

const DevNavSection = NavSection as React.ComponentClass<any>;

const PageNav = (props: DevConsoleNavigationProps) => {
  const isActive = (path: string) => {
    return props.location.endsWith(path);
  };

  return (
    <Nav aria-label="Nav" onSelect={props.onNavSelect} onToggle={props.onToggle}>
      <NavList>
        <NavItem className= {isActive('/devops')? 'pf-m-current' : ''}> 
          <Link to="/devops">
            Home
          </Link>
        </NavItem>
        <NavItem className= {isActive('/codebases')? 'pf-m-current' : ''}>
          <Link to="/devops/codebases" >
            Codebases
          </Link>
        </NavItem>
        <NavItem className={isActive('/import') ? 'pf-m-current' : ''}>
          <Link to="/devops/import" >
            Import
          </Link>
        </NavItem>
        <NavItem className={isActive('/topology') ? 'pf-m-current' : ''}>
          <Link to="/devops/topology">
            Topology
          </Link>
        </NavItem>
        <DevNavSection title="Menu Item">
          <HrefLink
            href="/devops/submenu_1"
            name="Sub Menu 1"
            activePath="/devops/submenu_1/"
          />
          <HrefLink
            href="/devops/submenu_2"
            name="Sub Menu 2"
            activePath="/devops/submenu_2/"
          />
        </DevNavSection>
      </NavList>
    </Nav>
  );
};

const DevConsoleNavigation: React.FunctionComponent<DevConsoleNavigationProps> = (
  props: DevConsoleNavigationProps,
) => {
  return <PageSidebar nav={<PageNav {...props} />} isNavOpen={props.isNavOpen} />;
};

const mapStateToProps = (state) => {
  return {
    location: state.UI.get('location'),
  };
};

export default connect(mapStateToProps)(DevConsoleNavigation);
