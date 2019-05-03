/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import { HrefLink, NavSection, ResourceClusterLink, ResourceNSLink } from '../../../components/nav';
import { FLAGS } from '../../../features';
import { BuildModel, PipelineModel } from '../../../models';
import { stripPerspectivePath } from '../../../components/utils/link';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  location: string;
  activeNamespace: string;
  onNavSelect: () => void;
  onToggle: () => void;
}

const stripNSFromPath = (href) => {
  if (href.includes('/ns/')) {
    href = href.split('/ns/');
    return href[0] + (href[1] ? href[1].replace(/[^/]*/, '') : '');
  }
  return href.replace('/all-namespaces', '');
};

const DevNavSection = NavSection as React.ComponentClass<any>;

export const PageNav = (props: DevConsoleNavigationProps) => {
  const isActive = (paths: Array<string>) => {
    let matchflag: boolean = false;
    paths.map(
      (path) =>
        (matchflag =
          matchflag ||
          matchPath(stripPerspectivePath(stripNSFromPath(props.location)), { path }) != null),
    );
    return matchflag;
  };

  return (
    <Nav aria-label="Nav" onSelect={props.onNavSelect} onToggle={props.onToggle}>
      <NavList>
        <HrefLink
          href="/add"
          name="+Add"
          activePath="/dev/add"
          isActive={isActive(['/add', '/import', '/catalog', '/k8s/import', '/deploy-image'])}
        />
        <HrefLink
          href="/topology"
          name="Topology"
          activePath="/dev/topology"
          isActive={isActive(['/topology'])}
        />
        <ResourceNSLink
          resource="buildconfigs"
          name={BuildModel.labelPlural}
          activeNamespace={props.activeNamespace}
          isActive={isActive(['/k8s/buildconfigs'])}
        />
        <ResourceNSLink
          resource="pipelines"
          name={PipelineModel.labelPlural}
          activeNamespace={props.activeNamespace}
          isActive={isActive(['/k8s/pipelines', '/k8s/pipelineruns'])}
        />
        <DevNavSection title="Advanced">
          <ResourceClusterLink resource="projects" name="Projects" required={FLAGS.OPENSHIFT} />
          <HrefLink
            href="/overview"
            name="Status"
            activePath="/overview"
            required={FLAGS.OPENSHIFT}
          />
          <HrefLink
            href="/status"
            name="Status"
            activePath="/status"
            disallowed={FLAGS.OPENSHIFT}
          />
          <ResourceNSLink resource="events" name="Events" />
          <HrefLink href="/search" name="Search" activePath="/search" />
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

export default connect(mapStateToProps)(DevConsoleNavigation);
