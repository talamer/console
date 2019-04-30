/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TopologyDataObject } from './topology-types';
import { ModelessOverlay } from 'patternfly-react';
import { CloseButton } from '../../../../components/utils';
import { ResourceOverviewPage } from '../../../../components/overview/resource-overview-page';
import './TopologySideBar.scss';

export type TopologySideBarProps = {
  item: TopologyDataObject;
  selected: string;
  onClose: Function;
};

const TopologySideBar: React.FunctionComponent<TopologySideBarProps> = ({
  item,
  selected,
  onClose,
}) => {
  const dc = item.resources.filter((o) => o.kind === 'DeploymentConfig' || o.kind === 'Deployment');
  const routes = item.resources.filter((o) => o.kind === 'Route');
  const services = item.resources.filter((o) => o.kind === 'Service');
  const buildConfigs = item.resources.filter((o) => o.kind === 'BuildConfig');
  const ItemtoShowOnSideBar = {
    obj: { apiVersion: 'apps.openshift.io/v1', ...dc[0] },
    kind: dc[0].kind,
    routes,
    services,
    buildConfigs,
  };

  return (
      <ModelessOverlay className="odc-topology-sidebar__overlay" show={!!selected}>
        <div className="odc-topology-sidebar__dismiss clearfix">
          <CloseButton onClick={onClose} data-test-id="sidebar-close-button" />
        </div>
        <ResourceOverviewPage item={ItemtoShowOnSideBar} kind={ItemtoShowOnSideBar.kind} />
      </ModelessOverlay>
  );
};

export default TopologySideBar;
