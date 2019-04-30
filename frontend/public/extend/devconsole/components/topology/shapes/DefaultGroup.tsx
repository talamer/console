/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as d3 from 'd3';
import { GroupProps, ViewNode } from '../topology-types';
import SvgBoxedText from '../../../shared/components/svg/SvgBoxedText';
import './DefaultGroup.scss';

const valueline = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(d3.curveBasisClosed);

// Return the point whose Y is the largest value.
function findLowestPoint(points: [number, number][]): [number, number] {
  let lowestPoint = points[0];

  points.forEach((p) => {
    if (p[1] > lowestPoint[1]) {
      lowestPoint = p;
    }
  });

  return lowestPoint;
}

// Padding around group points in pixels.
const GP = 50;

// Returns an array of points representing 8 points around the center of the node.
// We use these points to ensure that the surrounding group box does not intersect with the node.
function getNodePoints(node: ViewNode): [number, number][] {
  const radius = node.size / 2;
  const x0 = node.x - radius;
  const x1 = node.x + radius;
  const y0 = node.y - radius;
  const y1 = node.y + radius;
  return [
    ...[45, 135, 225, 315].map(
      (θ) =>
        [
          node.x + (radius + GP) * Math.sin(θ * Math.PI / 180),
          node.y + (radius + GP) * Math.cos(θ * Math.PI / 180),
        ] as [number, number],
    ),
    [node.x, y0 - GP],
    [node.x, y1 + GP],
    [x0 - GP, node.y],
    [x1 + GP, node.y],
  ];
}

const DefaultGroup: React.FC<GroupProps> = ({ name, nodes }) => {
  if (nodes.length === 0) {
    return null;
  }

  // collect all points to avoid for all nodes
  const points = nodes.reduce((acc, node) => [...acc, ...getNodePoints(node)], [] as [
    number,
    number
  ][]);

  // Get the convex hull of all points.
  const polygon = d3.polygonHull(points);

  // Find the cenroid of the convex hull
  const centroid = d3.polygonCentroid(polygon);

  // Convert the convex hull to a set of points to be used for the surrounding path.
  const dPoints = polygon.map(
    (point) => [point[0] - centroid[0], point[1] - centroid[1]] as [number, number],
  );

  // Find the lowest point of the set in order to place the group label.
  const lowestPoint = findLowestPoint(dPoints);

  return (
    <g>
      <path
        d={valueline(dPoints)}
        className="odc-default-group"
        transform={`translate(${centroid[0]},${centroid[1]})`}
      />
      <SvgBoxedText
        className={'odc-default-group__label'}
        x={centroid[0] + lowestPoint[0]}
        y={centroid[1] + lowestPoint[1] + 30}
        paddingX={20}
        paddingY={5}
      >
        {name}
      </SvgBoxedText>
    </g>
  );
};

export default DefaultGroup;
