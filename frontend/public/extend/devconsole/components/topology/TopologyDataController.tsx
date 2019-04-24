/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TopologyDataResources, Resource, TopologyDataModel } from './topology-types';
import { TransformTopologyData } from './topology-utils';

export interface TopologyDataProps {
  namespace: string;
  loaded?: boolean;
  resources?: TopologyDataResources;
  replicationControllers?: Resource;
  pods?: Resource;
  deploymentConfigs?: Resource;
  routes?: Resource;
  deployments?: Resource;
  services?: Resource;
  replicasets?: Resource;
  render: (props) => {};
}
export class TopologyDataController extends React.Component<TopologyDataProps> {
  shouldComponentUpdate(nextProps) {
    return this.props.namespace !== nextProps.namespace || nextProps.loaded;
  }
  /**
   * Transform the props into the topology data model
   */
  transformTopologyData(): TopologyDataModel {
    const topologyUtils = new TransformTopologyData(this.props.resources);
    topologyUtils.transformDataBy('deployments');
    topologyUtils.transformDataBy('deploymentConfigs');
    return topologyUtils.getTopologyData();
  }

  render() {
    return this.props.render({ topologyGraphData: this.transformTopologyData() });
  }
}

export default TopologyDataController;
