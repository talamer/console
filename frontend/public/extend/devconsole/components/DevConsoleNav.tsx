/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import {
  HrefLink,
  NavSection,
  ResourceClusterLink,
  ResourceNSLink,
  stripNS,
} from '../../../components/nav';
import { FLAGS, connectToFlags } from '../../../features';
import { BuildModel, PipelineModel } from '../../../models';
import { stripPerspectivePath } from '../../../components/utils/link';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  location: string;
  flags: { [key: string]: boolean };
  activeNamespace: string;
  onNavSelect: () => void;
  onToggle: () => void;
}

const DevNavSection = NavSection as React.ComponentClass<any>;

export const PageNav = ({
  location,
  activeNamespace,
  onNavSelect,
  onToggle,
  flags,
}: DevConsoleNavigationProps) => {
  const resourcePath = location ? stripNS(stripPerspectivePath(location)) : '';
  const isActive = (paths: string[]) => {
    return paths.some((path) => HrefLink.isActive({ href: path }, resourcePath));
  };
  const isResourceActive = (paths: string[]) => {
    return paths.some((path) =>
      ResourceNSLink.isActive({ resource: path }, resourcePath, activeNamespace),
    );
  };

  return (
    <Nav aria-label="Nav" onSelect={onNavSelect} onToggle={onToggle}>
      <NavList>
        <HrefLink
          href="/add"
          name="+Add"
          isActive={isActive(['add', 'import', 'catalog', 'import', 'deploy-image'])}
        />
        <HrefLink href="/topology" name="Topology" isActive={isActive(['topology'])} />
        <ResourceNSLink
          resource="buildconfigs"
          name={BuildModel.labelPlural}
          activeNamespace={activeNamespace}
          isActive={isResourceActive(['buildconfigs'])}
        />
        {flags[FLAGS.SHOW_PIPELINE] && (
          <ResourceNSLink
            resource="pipelines"
            name={PipelineModel.labelPlural}
            activeNamespace={activeNamespace}
            isActive={isResourceActive(['pipelines', 'pipelineruns'])}
          />
        )}
        <DevNavSection title="Advanced">
          <ResourceClusterLink resource="projects" name="Projects" required={FLAGS.OPENSHIFT} />
          <HrefLink href="/overview" name="Status" required={FLAGS.OPENSHIFT} />
          <HrefLink href="/status" name="Status" disallowed={FLAGS.OPENSHIFT} />
          <ResourceNSLink resource="events" name="Events" />
          <HrefLink href="/search" name="Search" />
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
    activeNamespace: state.UI.get('activeNamespace'),
  };
};

export default connect(mapStateToProps)(connectToFlags(FLAGS.SHOW_PIPELINE)(DevConsoleNavigation));
