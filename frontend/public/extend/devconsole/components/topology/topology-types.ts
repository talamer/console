import { ObjectMetadata } from 'public/module/k8s';

export interface ResourceProps {
  kind: string;
  metadata: ObjectMetadata[];
  status: {};
  spec: {
    selector?: {};
  };
}
export interface Resource {
  data: ResourceProps[];
}
export interface TopologyDataResources {
  replicationControllers: Resource;
  pods: Resource;
  deploymentConfigs: Resource;
  services: Resource;
  routes: Resource;
  deployments: Resource;
  replicasets: Resource;
}

export interface Node {
  id: string;
  type: string;
  name: string;
}

export interface Edge {
  source: string;
  target: string;
}
export interface Group {
  id: string;
  name: string;
  nodes: string[];
}

export interface TopologyDataModel {
  graph: {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
  };
  topology: {
    [key: string]: TopologyNodeObject;
  };
}
export interface Pod {
  id: string;
  name: string;
  kind: string;
  metadata: {};
  status: {};
}
export interface TopologyNodeObject {
  id: string;
  name: string;
  type: string;
  resources: Resource[];
  data: {
    url: string;
    editUrl: string;
    builderImage: string;
    donutStatus: {
      pods: Pod[];
    };
  };
}
