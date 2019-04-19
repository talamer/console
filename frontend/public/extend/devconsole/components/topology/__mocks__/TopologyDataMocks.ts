/* eslint-disable no-unused-vars, no-undef */
import { TopologyDataModel, TopologyDataResources } from '../topology-types';

export const resources: TopologyDataResources = {
  replicationControllers: { data: [] },
  pods: { data: [] },
  deploymentConfigs: { data: [] },
  services: { data: [] },
  routes: { data: [] },
  deployments: { data: [] },
  replicasets: { data: [] },
};

export const topologyData: TopologyDataModel = {
  graph: { nodes: [], edges: [], groups: [] },
  topology: {},
};
