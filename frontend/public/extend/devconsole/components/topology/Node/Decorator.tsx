import * as React from "react";

interface DecoratorTypes {
  radius: number;
  onClick?: any;
}

const Decorator: React.SFC<DecoratorTypes> = ({radius, onClick}) => {
  return (
    <g className="decorator">
      <defs>
        <filter id="dropshadow">
        {/*
          // @ts-ignore */}
          <feDropShadow dx=".2" dy=".2" stdDeviation=".3" />
        </filter>
      </defs>
      <g>
        <circle
          className="che-link"
          cx={radius * 2}
          cy={radius * 2 + 6}
          r={3.5}
          fill="#fff"
          filter="url(#dropshadow)"
          onClick={onClick}
        />
      </g>
    </g>
  );
};

export default Decorator;
