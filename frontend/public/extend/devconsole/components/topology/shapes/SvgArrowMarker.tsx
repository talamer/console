import * as React from 'react';
import SvgDefs from '../../../shared/components/svg/SvgDefs';

type SvgArrowMarkerProps = {
  id: string;
  nodeSize: number;
  markerSize: number;
  className: string;
};

const SvgArrowMarker: React.FC<SvgArrowMarkerProps> = ({ id, nodeSize, markerSize, className }) => {
  const lengthOfEachSideOfMarker = markerSize * 0.6;
  return (
    <SvgDefs id={id}>
      <marker
        id={id}
        markerWidth={markerSize}
        markerHeight={markerSize}
        refX={nodeSize / 2 + markerSize / 2}
        refY={lengthOfEachSideOfMarker / 2}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M0,0 L0,${lengthOfEachSideOfMarker} L${lengthOfEachSideOfMarker},${lengthOfEachSideOfMarker /
            2} z`}
          className={className}
        />
      </marker>
    </SvgDefs>
  );
};

export default SvgArrowMarker;
