/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import { HrefLink, NavSection } from '../../../components/nav';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  location: string;
  onNavSelect: () => void;
  onToggle: () => void;
}

const DevNavSection = NavSection as React.ComponentClass<any>;

export const PageNav = (props: DevConsoleNavigationProps) => {
  const isActive = (path: string) => {
    return props.location.endsWith(path);
  };

  return (
    <Nav aria-label="Nav" onSelect={props.onNavSelect} onToggle={props.onToggle}>
      <NavList>
        <HrefLink
          href="/dev"
          name="Home"
          activePath="/dev"
          isActive={isActive('/dev')}
        />
        <HrefLink
          href="/dev/codebases"
          name="Codebases"
          activePath="/dev/codebases"
          isActive={isActive('/codebases')}
        />
        <HrefLink
          href="/dev/import"
          name="Import"
          activePath="/dev/import"
          isActive={isActive('/import')}
        />
        <HrefLink
          href="/dev/topology"
          name="Topology"
          activePath="/dev/topology"
          isActive={isActive('/topology')}
        />
        <DevNavSection title="Menu Item">
          <HrefLink
            href="/dev/submenu_1"
            name="Sub Menu 1"
            activePath="/dev/submenu_1/"
          />
          <HrefLink
            href="/dev/submenu_2"
            name="Sub Menu 2"
            activePath="/dev/submenu_2/"
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

const mapStateToProps = (state) => {
  return {
    location: state.UI.get('location'),
  };
};

export default connect(mapStateToProps)(DevConsoleNavigation);
