import * as React from 'react';
import './BaseEdge.scss';
import { createSvgIdUrl } from '../../../shared/utils/svg-utils';
import { ViewNode } from '../topology-types';

type BaseEdgeProps = {
  source: ViewNode;
  target: ViewNode;
  sourceMarkerId?: string;
  targetMarkerId?: string;
};

const BaseEdge: React.SFC<BaseEdgeProps> = ({ source, target, sourceMarkerId, targetMarkerId }) => (
    <line
      className="odc-base-edge"
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      markerStart={sourceMarkerId ? createSvgIdUrl(sourceMarkerId) : undefined}
      markerEnd={targetMarkerId ? createSvgIdUrl(targetMarkerId) : undefined}
    />
);

export default BaseEdge;
