import * as React from 'react';
import { TopologyDataObject } from './topology-types';
import { ModelessOverlay } from 'patternfly-react';
import { CloseButton } from '../../../../components/utils';
import { ResourceOverviewPage } from '../../../../components/overview/resource-overview-page';

type TopologySideBarProps = {
  item: TopologyDataObject;
  selected: string;
}

class TopologySideBar extends React.Component<TopologySideBarProps> {

  getSelectedItem = (item: TopologyDataObject) => {
    console.log(item.resources.filter(o => o.kind === "DeploymentConfig" || o.kind === "Deployment")[0]);
    return item.resources.filter(o => o.kind === "DeploymentConfig" || o.kind === "Deployment")[0];

  }

  render() {
    const ItemtoShowOnSideBar = this.getSelectedItem(this.props.item);
    return (
      <>
      <ModelessOverlay show={!!this.props.selected}>
      <div className="overview__sidebar-dismiss clearfix">
            <CloseButton onClick={() => ('')} />
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