/* eslint-disable no-unused-vars, no-undef */
import DefaultEdge from './shapes/DefaultEdge';
import DefaultNode from './shapes/DefaultNode';
import NodeWrapper from './Node/NodeWrapper';
import { NodeProvider, EdgeProvider } from './topology-types';

export const nodeProvider: NodeProvider = ({ type }) => {
  switch (type) {
    case 'workload':
      return NodeWrapper;
    default:
      return DefaultNode;
  }
};

export const edgeProvider: EdgeProvider = ({ type }) => {
  switch (type) {
    default:
      return DefaultEdge;
  }
};
