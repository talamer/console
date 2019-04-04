/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import { HrefLink, NavSection, ResourceClusterLink, ResourceNSLink } from '../../../components/nav';
import { FLAGS } from '../../../features';
import { BuildConfigModel, BuildModel, ImageStreamModel, ClusterServiceVersionModel } from '../../../models';

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
          href="/dev/add"
          name="+Add"
          activePath="/dev/add"
          isActive={isActive('/add')}
        />
        <HrefLink
          href="/dev/topology"
          name="Topology"
          activePath="/dev/topology"
          isActive={isActive('/topology')}
        />
        <DevNavSection title="Catalog">
          <HrefLink href="/dev/catalog" name="Developer Catalog" activePath="/dev/catalog/" />
          <ResourceNSLink
            model={ClusterServiceVersionModel}
            resource={ClusterServiceVersionModel.plural}
            name="Installed Operators"
            separatorConditions={[
              [FLAGS.CAN_LIST_PACKAGE_MANIFEST, FLAGS.CAN_LIST_OPERATOR_GROUP, FLAGS.OPERATOR_HUB],
              [FLAGS.CAN_LIST_PACKAGE_MANIFEST, FLAGS.CAN_LIST_OPERATOR_GROUP],
              FLAGS.SERVICE_CATALOG,
            ]}
          />
          <HrefLink
            required={[FLAGS.CAN_LIST_PACKAGE_MANIFEST, FLAGS.CAN_LIST_OPERATOR_GROUP, FLAGS.OPERATOR_HUB]}
            href="/dev/operatorhub"
            name="OperatorHub"
            activePath="/dev/operatorhub/"
          />
        </DevNavSection>
        <DevNavSection title="Builds">
          <ResourceNSLink resource="buildconfigs" name={BuildConfigModel.labelPlural} />
          <ResourceNSLink resource="builds" name={BuildModel.labelPlural} />
          <ResourceNSLink resource="imagestreams" name={ImageStreamModel.labelPlural} startsWith={['imagestreams', 'imagestreamtags']} />
        </DevNavSection>
        <DevNavSection title="Pipelines">
          <HrefLink href="/dev/pipelines" name="Piplines" activePath="/pipelines/" />
          <HrefLink href="/dev/pipelines/run" name="Pipline Runs" activePath="/pipelines/run" />
        </DevNavSection>
        <DevNavSection title="Advanced">
          <ResourceClusterLink resource="projects" name="Projects" required={FLAGS.OPENSHIFT} />
          <HrefLink href="/dev/overview" name="Status" activePath="/overview/" required={FLAGS.OPENSHIFT} />
          <HrefLink href="/dev/status" name="Status" activePath="/status/" disallowed={FLAGS.OPENSHIFT} />
          <ResourceNSLink resource="events" name="Events" />
          <HrefLink href="/dev/search" name="Search" startsWith={['search']} />
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
