/* eslint-disable no-unused-vars, no-undef */
import { ComponentType } from 'react';
import { ObjectMetadata } from '../../../../module/k8s';

export interface ResourceProps {
  kind: string;
  apiVersion?: string;
  metadata: ObjectMetadata;
  status: {};
  spec: {
    [key: string]: any;
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
  buildconfigs: Resource;
}

export interface Node {
  id: string;
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
  resources: ResourceProps[];
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

export type ViewNode = {
  id: string;
  type?: string;
  x: number;
  y: number;
  size: number;
};

export type ViewEdge = {
  id: string;
  type?: string;
  source: ViewNode;
  target: ViewNode;
};

export type ViewGroup = Group;

export type NodeProps<D = {}> = ViewNode &
  Selectable & {
    data?: TopologyDataObject<D>;
  };

export type EdgeProps<D = {}> = ViewEdge & {
  data?: TopologyDataObject<D>;
};

export interface NodeProvider {
  (string): ComponentType<NodeProps>;
}

export interface EdgeProvider {
  (string): ComponentType<EdgeProps>;
}
