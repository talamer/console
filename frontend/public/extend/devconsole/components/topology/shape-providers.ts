/* eslint-disable no-unused-vars, no-undef */
import DefaultEdge from './shapes/DefaultEdge';
import DefaultNode from './shapes/DefaultNode';
import DefaultGroup from './shapes/DefaultGroup';
import WorkloadNode from './shapes/WorkloadNode';
import { NodeProvider, EdgeProvider, GroupProvider } from './topology-types';

export const nodeProvider: NodeProvider = (type) => {
  switch (type) {
    case 'workload':
      return WorkloadNode;
    default:
      return DefaultNode;
  }
};

export const edgeProvider: EdgeProvider = (type) => {
  switch (type) {
    default:
      return DefaultEdge;
  }
};

export const groupProvider: GroupProvider = (type) => {
  switch (type) {
    default:
      return DefaultGroup;
  }
};
