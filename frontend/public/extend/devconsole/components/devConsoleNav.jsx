import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import { NavSection, HrefLink } from '../../../components/nav';

import { FLAGS } from '../../../features';

export const DevConsoleNavigation = ({ isNavOpen, onNavSelect }) => {
    const PageNav = (
      <Nav aria-label="Nav" onSelect={onNavSelect}>
        <NavList>
          <NavSection title="Menu 1">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
          <NavSection title="Menu 2">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
          <NavSection title="Menu 3">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
        </NavList>
      </Nav>
    );
    return <PageSidebar nav={PageNav} isNavOpen={isNavOpen} />;
  };


DevConsoleNavigation.propTypes = {
    isNavOpen: PropTypes.bool,
    onNavSelect: PropTypes.func,
  };
