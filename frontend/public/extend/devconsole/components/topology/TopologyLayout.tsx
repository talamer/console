import * as React from 'react';
import { TopologyDataModel } from '../topology/topology-types';

export interface TopologyLayoutProps {
  topologyGraphData: TopologyDataModel;
}

const TopologyLayout: React.SFC<TopologyLayoutProps> = (props: TopologyLayoutProps) => {
  const { topologyGraphData } = props;
  if (!topologyGraphData.graph.nodes.length) {
    return null;
  }
  return (
    <div>
      <h1>Deployments</h1>
      <ul>
        {topologyGraphData.graph.nodes.map((pod) => (
          <li key={pod.id}>{pod.name}</li>
        ))}
      </ul>
    </div>
  );

};

export default TopologyLayout;
