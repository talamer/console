import * as React from 'react';
import { TopologyDataObject } from './topology-types';
import { ModelessOverlay } from 'patternfly-react';
import { CloseButton } from '../../../../components/utils';
import { ResourceOverviewPage } from '../../../../components/overview/resource-overview-page';

type TopologySideBarProps = {
  item: TopologyDataObject;
  selected: string;
  onClose: Function;
}

class TopologySideBar extends React.Component<TopologySideBarProps> {

  getSelectedItemObj = (item: TopologyDataObject) => {
    const dc = item.resources.filter(o => o.kind === "DeploymentConfig" || o.kind === "Deployment");
    const routes = item.resources.filter(o => o.kind === "Route");
    const services = item.resources.filter(o => o.kind === "Service");
    const buildConfigs = item.resources.filter(o => o.kind === "BuildConfig");
    return {
      obj: { apiVersion: "apps.openshift.io/v1",
        ...dc[0]
      },
      kind: dc[0].kind,
      routes,
      services,
      buildConfigs,
    }

  }

  render() {
    const ItemtoShowOnSideBar = this.getSelectedItemObj(this.props.item);
    return (
      <>
      <ModelessOverlay show={!!this.props.selected}>
      <div className="overview__sidebar-dismiss clearfix">
            <CloseButton onClick={this.props.onClose} />
          </div>
          <ResourceOverviewPage
            item={ItemtoShowOnSideBar}
            kind={ItemtoShowOnSideBar.kind}
          />
      </ModelessOverlay>
      </>
    );
  }
}

export default TopologySideBar;