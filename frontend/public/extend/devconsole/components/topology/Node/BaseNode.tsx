import * as React from "react";

interface BaseNodeProps {
  height: number;
  width: number;
  radius: number;
  strokeWidth: number;
  selected: boolean;
  icon?: string;
  label?: string;
}

const BaseNode: React.SFC<BaseNodeProps> = ({
  height,
  width,
  radius,
  strokeWidth,
  selected,
  icon
}) => {
  return (
    <g transform={`translate(0, 0)`}>
      <defs>
        <pattern
          id="image"
          x="0"
          y="0"
          height="100%"
          width="100%"
          viewBox={`0 0 ${radius * 2 - strokeWidth} ${radius * 2 -
            strokeWidth}`}
        >
          <image
            x="0"
            y="0"
            width={radius * 2 - strokeWidth}
            height={radius * 2 - strokeWidth}
            xlinkHref={icon ? `/static/assets/${icon}.svg`: "/static/assets/openshift-logo.svg"}
          />
        </pattern>
      </defs>
      <circle
        className="base-circle"
        cx={0}
        cy={0}
        r={radius}
        fill="#fff"
        stroke="#fff"
        strokeWidth={strokeWidth + strokeWidth * .33}
      />
      <circle
        className="donut-hole"
        cx={0}
        cy={0}
        r={radius - (strokeWidth * .75)}
        fill="url(#image)"
      />
      <text className="label" textAnchor="middle" y={height / 2 + 22} x={0}> Label </text>
      {selected && (
        <circle
          className="selected"
          cx={0}
          cy={0}
          r={radius + strokeWidth - 0.5}
          fill="transparent"
          stroke="#77BAFF"
          strokeWidth={strokeWidth * .26}
        />
      )}
    </g>
  );
};

export default BaseNode;
