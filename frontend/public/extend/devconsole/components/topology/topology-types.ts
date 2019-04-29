/* eslint-disable no-unused-vars, no-undef */
import { ComponentType } from 'react';
import { ObjectMetadata } from '../../../../module/k8s';

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
  id?: string;
  type?: string;
  name?: string;
}

export interface Edge {
  id?: string;
  type?: string;
  source: string;
  target: string;
}

export interface Group {
  id?: string;
  name: string;
  nodes: string[];
}

export interface GraphModel {
  nodes: Node[];
  edges: Edge[];
  groups: Group[];
}

export interface TopologyDataMap {
  [id: string]: TopologyDataObject;
}

export interface TopologyDataModel {
  graph: GraphModel;
  topology: TopologyDataMap;
}
export interface Pod {
  id: string;
  name: string;
  kind: string;
  metadata: {};
  status: {};
}

export interface TopologyDataObject<D = {}> {
  id: string;
  name: string;
  type: string;
  resources: Resource[];
  data: D;
}

export interface WorkloadData {
  url?: string;
  editUrl?: string;
  builderImage?: string;
  donutStatus: {
    pods: Pod[];
  };
}

export interface GraphApi {
  zoomIn(): void;
  zoomOut(): void;
  resetView(): void;
}

export interface Selectable {
  selected?: boolean;
  onSelect?(): void;
}

export type ViewNode = Node & {
  x?: number;
  y?: number;
  size?: number;
};

export type ViewEdge = Edge & {
  source: ViewNode;
  target: ViewNode;
};

export type ViewGroup = Group;

export interface ViewGraphData {
  nodes: ViewNode[];
  edges: ViewEdge[];
  groups: ViewGroup[];
}

export type NodeProps<D = {}> = ViewNode &
  Selectable & {
    data?: TopologyDataObject<D>;
  };

export type EdgeProps<D = {}> = ViewEdge & {
  data?: TopologyDataObject<D>;
};

export interface NodeProvider {
  (ViewNode, any): ComponentType<NodeProps>;
}

export interface EdgeProvider {
  (ViewNode, any): ComponentType<EdgeProps>;
}
