import * as React from 'react';
import './BaseEdge.scss';
import SvgArrowMarker from './../../../shared/components/svg/SvgArrowMarker';
import { createSvgIdUrl } from '../../../shared/utils/svg-utils';

type BaseEdgeProps = {
  source: any;
  target: any;
  sourceArrow?: boolean;
  targetArrow?: boolean;
};

const SOURCE_ARROW_MARKER_ID = 'sourceArrowMarker';
const TARGET_ARROW_MARKER_ID = 'targetArrowMarker';

const BaseEdge: React.SFC<BaseEdgeProps> = ({ source, target, sourceArrow = false, targetArrow = false }) => (
  <g>
    {sourceArrow ? <SvgArrowMarker id={SOURCE_ARROW_MARKER_ID}  /> : null}
    {targetArrow ? <SvgArrowMarker id={TARGET_ARROW_MARKER_ID}  /> : null}
    <line
      className="odc-base-edge"
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      markerStart={sourceArrow ? createSvgIdUrl(SOURCE_ARROW_MARKER_ID) : undefined}
      markerEnd={targetArrow ? createSvgIdUrl(TARGET_ARROW_MARKER_ID) : undefined}
    />
  </g>
);

export default BaseEdge;
