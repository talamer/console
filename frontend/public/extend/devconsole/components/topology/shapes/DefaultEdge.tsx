/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { EdgeProps } from '../topology-types';
import BaseEdge from './BaseEdge';

export type DefaultEdgeProps = EdgeProps;

const DefaultEdge: React.SFC<DefaultEdgeProps> = ({ source, target, nodeSize }) => (
  <BaseEdge source={source} target={target} nodeSize={nodeSize}/>
);

export default DefaultEdge;
