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
}: BaseNodeProps) => (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <pattern
          id="image"
          x="0"
          y="0"
          height="100%"
          width="100%"
          viewBox={`0 0 ${innerRadius} ${innerRadius}`}
        >
          <image
            x="0"
            y="0"
            width={innerRadius}
            height={innerRadius}
            xlinkHref={icon ? `/static/assets/${icon}.svg` : '/static/assets/openshift.svg'}
          />
        </pattern>
      </defs>
      <circle cx={0} cy={0} r={outerRadius} fill="#fff" />
      <circle cx={0} cy={0} r={innerRadius} fill="url(#image)" />
      <text
        textAnchor="middle"
        style={{ fontSize: outerRadius * 0.25 }}
        y={outerRadius + outerRadius * 0.25}
        x={0}
      >
        {label ? label : 'DeploymentConfig'}
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
