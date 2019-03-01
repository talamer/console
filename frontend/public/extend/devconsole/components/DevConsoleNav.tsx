import * as React from 'react';
import { Nav, NavList, PageSidebar, NavItem } from '@patternfly/react-core';
import { HrefLink, NavSection } from '../../../components/nav';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  onNavSelect: () => void;
  onToggle: () => void;
}

const DevNavSection = NavSection as React.ComponentClass<any>;

const PageNav = (props: DevConsoleNavigationProps) => {
  return (
    <Nav aria-label="Nav" onSelect={props.onNavSelect} onToggle={props.onToggle}>
      <NavList>
        <NavItem to="/devconsole" itemId="itm-1">
          Home
        </NavItem>
        <NavItem to="/devconsole/codebases" itemId="itm-2">
          Codebase
        </NavItem>
        <NavItem to="/devconsole/import" itemId="itm-1">
          Import
        </NavItem>
        <NavItem to="/devconsole/topology" itemId="itm-1">
          Topology
        </NavItem>
        <DevNavSection title="Menu Item">
          <HrefLink
            href="/devconsole/submenu_1"
            name="Sub Menu 1"
            activePath="/devconsole/submenu_1/"
          />
          <HrefLink
            href="/devconsole/submenu_2"
            name="Sub Menu 2"
            activePath="/devconsole/submenu_2/"
          />
        </DevNavSection>
      </NavList>
    </Nav>
  );
};

export const DevConsoleNavigation: React.FunctionComponent<DevConsoleNavigationProps> = (
  props: DevConsoleNavigationProps,
) => {
  return <PageSidebar nav={<PageNav {...props} />} isNavOpen={props.isNavOpen} />;
};
