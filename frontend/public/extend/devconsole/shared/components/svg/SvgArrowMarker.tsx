import * as React from 'react';
import SvgDefs from './SvgDefs';

type SvgArrowMarkerProps = {
  id: string;
  arrowColor?: string;
};

const SvgArrowMarker: React.FC<SvgArrowMarkerProps> = ({ id, arrowColor = "#282D33" }) => (
  <SvgDefs id={id}>
    <marker
      id={id}
      markerWidth="10"
      markerHeight="10"
      refX={31.5}
      refY="3"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,6 L6,3 z" fill={arrowColor} />
    </marker>
  </SvgDefs>
);

export default SvgArrowMarker;
