import * as React from "react";

interface DecoratorTypes {
  x: number;
  y: number;
  radius: number;
  onClick?: any;
}

const Decorator: React.SFC<DecoratorTypes> = ({x, y, radius, onClick, children}) => {
  return (
    <g className="decorator" transform={`translate(${x}, ${y})`}>
      <defs>
        <filter id="dropshadow">
        {/*
          // @ts-ignore */}
          <feDropShadow dx=".7" dy=".7" stdDeviation=".8" />
        </filter>
      </defs>
        <circle
          className="che-link"
          cx={0}
          cy={0}
          r={radius}
          fill="#fff"
          filter="url(#dropshadow)"
          onClick={onClick}
        />
        {children}
      </g>
  );
};

export default Decorator;
