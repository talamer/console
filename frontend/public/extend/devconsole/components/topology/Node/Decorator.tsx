/* eslint-disable no-unused-vars, no-undef */

import * as React from 'react';

type DecoratorTypes = {
  x: number;
  y: number;
  radius: number;
  onClick?: any;
};

const Decorator: React.SFC<DecoratorTypes> = ({ x, y, radius, onClick, children }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <filter id="dropshadow">
          {/*
          // @ts-ignore */}
          <feDropShadow dx=".7" dy=".7" stdDeviation=".8" />
        </filter>
      </defs>
      <circle cx={0} cy={0} r={radius} fill="#fff" filter="url(#dropshadow)" onClick={onClick} />
      {children}
    </g>
  );
};

export default Decorator;
