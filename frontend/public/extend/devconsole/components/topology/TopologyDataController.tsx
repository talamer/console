/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TopologyDataProps, TopologyDataModel } from './topology-types';
import { TransformTopologyData } from './TopologyDataUtils';

class TopologyDataController extends React.Component<TopologyDataProps> {
  constructor(props) {
    super(props);
  }
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
