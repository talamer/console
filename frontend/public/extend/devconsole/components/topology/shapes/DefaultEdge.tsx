/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { EdgeProps } from '../topology-types';
import './DefaultEdge.scss';

export type DefaultEdgeProps = EdgeProps;

const DefaultEdge: React.SFC<DefaultEdgeProps> = ({ source, target }) => (
  <line className="odc-default-edge" x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
);

export default DefaultEdge;
