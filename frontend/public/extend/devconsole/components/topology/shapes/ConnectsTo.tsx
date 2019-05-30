import * as React from 'react';
import { EdgeProps } from '../topology-types';
import BaseEdge from './BaseEdge';
import SvgArrowMarker from './SvgArrowMarker';

type ConnectsToProps = EdgeProps;

const TARGET_ARROW_MARKER_ID = 'connectsToTargetArrowMarker';
const strokeWidth = 2; // this should be equal to strokeWidth of BaseEdge always

const ConnectsTo: React.FC<ConnectsToProps> = ({ source, target }) => (
  <React.Fragment>
    <SvgArrowMarker
      id={TARGET_ARROW_MARKER_ID}
      nodeSize={source.size}
      markerSize={strokeWidth * 10}
      className={'odc-edge-marker'}
    />
    <BaseEdge source={source} target={target} targetMarkerId={TARGET_ARROW_MARKER_ID} />
  </React.Fragment>
);

export default ConnectsTo;
