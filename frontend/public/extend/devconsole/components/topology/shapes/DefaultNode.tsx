/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NodeProps } from '../topology-types';
import BaseNode from './BaseNode';

const DefaultNode: React.FC<NodeProps> = ({ data, x, y, size, selected, onSelect }) => (
  <BaseNode
    x={x}
    y={y}
    label={data.name}
    outerRadius={size / 2}
    selected={selected}
    onSelect={onSelect}
  />
);

export default DefaultNode;
