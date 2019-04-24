import * as React from 'react';

type BaseNodeProps = {
  x?: number;
  y?: number;
  baseOuterRadius: number;
  baseInnerRadius: number;
  selected: boolean;
  onSelect?: Function;
  icon?: string;
  label?: string;
};

const BaseNode: React.SFC<BaseNodeProps> = ({
  x = 0,
  y = 0,
  baseOuterRadius,
  baseInnerRadius,
  selected,
  icon,
  label,
}) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <pattern
          id="image"
          x="0"
          y="0"
          height="100%"
          width="100%"
          viewBox={`0 0 ${baseInnerRadius} ${baseInnerRadius}`}
        >
          <image
            x="0"
            y="0"
            width={baseInnerRadius}
            height={baseInnerRadius}
            xlinkHref={icon ? `/static/assets/${icon}.svg` : '/static/assets/openshift.svg'}
          />
        </pattern>
      </defs>
      <circle cx={0} cy={0} r={baseOuterRadius} fill="#fff" />
      <circle  cx={0} cy={0} r={baseInnerRadius} fill="url(#image)" />
      <text
        textAnchor="middle"
        style={{ fontSize: baseOuterRadius * 0.25 }}
        y={baseOuterRadius + baseOuterRadius * 0.25}
        x={0}
      >
        {label ? label : 'DeploymentConfig'}
      </text>
      {selected && (
        <circle
          cx={0}
          cy={0}
          r={baseOuterRadius + baseOuterRadius * 0.03}
          fill="transparent"
          stroke="#77BAFF"
          strokeWidth={baseOuterRadius * 0.06}
        />
      )}
    </g>
  );
};

export default BaseNode;
