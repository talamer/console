/* eslint-disable no-unused-vars, no-undef */

import * as React from 'react';

type BaseNodeProps = {
  x?: number;
  y?: number;
  outerRadius: number;
  innerRadius: number;
  selected: boolean;
  onSelect?: Function;
  icon?: string;
  label?: string;
};

const BaseNode: React.FunctionComponent<BaseNodeProps> = ({
  x = 0,
  y = 0,
  outerRadius,
  innerRadius,
  selected,
  icon,
  label,
  onSelect,
}: BaseNodeProps) => (
  <g
    transform={`translate(${x}, ${y})`}
    onClick={
      onSelect
        ? (e) => {
          e.stopPropagation();
          onSelect();
        }
        : null
    }
  >
    <circle cx={0} cy={0} r={outerRadius} fill="#fff" />
    <image
      x={-innerRadius}
      y={-innerRadius}
      width={innerRadius * 2}
      height={innerRadius * 2}
      xlinkHref={icon ? `/static/assets/${icon}.svg` : '/static/assets/openshift.svg'}
      onError={(e) => e.currentTarget.setAttribute('xlink:href', '/static/assets/openshift.svg')}
    />
    <text
      textAnchor="middle"
      style={{ fontSize: outerRadius * 0.25 }}
      y={outerRadius + outerRadius * 0.25}
      x={0}
    >
      {label}
    </text>
    {selected && (
      <circle
        cx={0}
        cy={0}
        r={outerRadius + outerRadius * 0.03}
        fill="transparent"
        stroke="#77BAFF"
        strokeWidth={outerRadius * 0.06}
      />
    )}
  </g>
);

export default BaseNode;
