/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NodeProps } from '../topology-types';
import './DefaultNode.scss';

export type DefaultNodeProps = NodeProps & {
  icon?: React.ReactNode;
};

const DefaultNode: React.FC<DefaultNodeProps> = ({
  id,
  data,
  x,
  y,
  size,
  selected,
  onSelect,
  icon,
}: DefaultNodeProps) => (
  <g
    transform={`translate(${x},${y})`}
    onClick={
      onSelect
        ? (e) => {
          e.stopPropagation();
          onSelect();
        }
        : null
    }
  >
    <defs>
      <filter id="dropShadow" width="150%" height="150%">
        {/*
          // @ts-ignore */}
        <feDropShadow dx="0" dy="1" stdDeviation=".75" floodColor="#030303" floodOpacity="0.35" />
      </filter>
    </defs>
    <circle
      className="odc-default-node"
      filter="url(#dropShadow)"
      cx={0}
      cy={0}
      r={size / 2}
    />
    <text
      className={`odc-default-node__label ${selected ? 'is-selected' : ''}`}
      textAnchor="middle"
      x={0}
      y={size / 2 + 22}
    >
      {(data && data.name) || id}
    </text>
    {icon || (
      <path
        className="odc-default-node__icon"
        transform="translate(-100,-30)scale(.6)"
        d="M145.7,45.3l-16.1,5.8c0.2,2.6,0.6,5.1,1.3,7.6l15.3-5.6C145.7,50.6,145.5,47.9,145.7,45.3M216.7,27.5c-1.1-2.3-2.4-4.5-3.9-6.6l-16.1,5.8c1.9,1.9,3.4,4.1,4.7,6.4L216.7,27.5zM181.4,23c3.3,1.6,6.2,3.7,8.7,6.2l16.1-5.8c-4.4-6.2-10.5-11.5-17.9-14.9c-22.9-10.7-50.3-0.7-61,22.2c-3.5,7.4-4.8,15.3-4.1,23l16.1-5.8c0.3-3.5,1.1-7,2.7-10.3C148.7,22.5,166.4,16,181.4,23M131.9,58.4l-15.3,5.6c1.4,5.6,3.8,10.8,7.2,15.5l16-5.8C135.8,69.4,133,64.1,131.9,58.4M198.5,52.3c-0.3,3.5-1.1,7-2.7,10.3C188.8,77.5,171,84,156.1,77c-3.3-1.6-6.3-3.7-8.7-6.2l-16,5.8c4.4,6.2,10.5,11.5,17.9,14.9c22.9,10.7,50.3,0.7,61-22.2c3.5-7.4,4.7-15.3,4.1-22.9L198.5,52.3zM202.4,32.7l-15.3,5.6c2.8,5.1,4.2,10.9,3.7,16.8l16-5.8C206.5,43.5,204.9,37.9,202.4,32.7"
      />
    )}
    {selected && <circle className={'odc-default-node__selection'} cx={0} cy={0} r={size / 2} />}
  </g>
);

export default DefaultNode;
