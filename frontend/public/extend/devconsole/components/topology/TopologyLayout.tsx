import * as React from 'react';
import { TopologyDataModel } from '../topology/TopologyDataController';

export interface TopologyLayoutProps {
  topologyGraphData: TopologyDataModel;
}

const TopologyLayout: React.SFC<any> = (props: any) => {
  const { topologyGraphData } = props;
  if (!topologyGraphData.graphData.nodes.length) {
    return null;
  }
  return (
    <div>
      <h1>Deployments</h1>
      <ul>
        {topologyGraphData.graphData.nodes.map((pod) => (
          <li key={pod.id}>{pod.name}</li>
        ))}
      </ul>
    </div>
  );

};

export default TopologyLayout;
