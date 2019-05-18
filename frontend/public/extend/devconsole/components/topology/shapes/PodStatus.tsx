/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { VictoryPie } from 'victory';
import './DefaultGroup.scss';
import { Pod } from '../topology-types';
import Tooltip from '../SvgPodTooltip';

export const podColor = {
  Running: '#00b9e4',
  Empty: '#ffffff',
  'Not Ready': '#beedf9',
  Warning: '#f39d3c',
  Failed: '#d9534f',
  Pulling: '#d1d1d1',
  Pending: '#ededed',
  Succceeded: '#3f9c35',
  Terminating: '#00659c',
  Unknown: '#f9d67a',
};

const podStatus = [
  'Running',
  'Not Ready',
  'Warning',
  'Empty',
  'Failed',
  'Pulling',
  'Pending',
  'Succceeded',
  'Terminating',
  'Unknown',
];

type PodStatusProps = {
  innerRadius: number;
  outerRadius: number;
  size: number;
  standalone: boolean;
  x?: number;
  y?: number;
  data: Pod[];
  showTooltip?: boolean;
};

const PodStatus: React.FC<PodStatusProps> = ({
  innerRadius,
  outerRadius,
  x,
  y,
  data,
  size,
  standalone,
  showTooltip = true,
}) => {
  const vData = [];
  podStatus.forEach((pod) => {
    let podNumber = 0;
    data.forEach((element) => {
      if (element.status.phase === pod) {
        podNumber += 1;
      }
    });
    if (podNumber !== 0) {
      vData.push({ x: pod, y: podNumber });
    }
  });
  const centerTransform = `translate(${x}, ${y})`;
  return (
    <VictoryPie
      events={
        showTooltip
          ? [
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: (props) => {
                        return { active: true };
                      },
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: (props) => {
                        return { active: false };
                      },
                    },
                  ];
                },
              },
            },
          ]
          : []
      }
      animate={{
        duration: 2000,
      }}
      standalone={standalone}
      innerRadius={innerRadius}
      radius={outerRadius}
      groupComponent={x && y ? <g transform={centerTransform} /> : <g />}
      data={vData}
      height={size}
      width={size}
      labelComponent={<Tooltip x={outerRadius + 2} y={-12} />}
      padAngle={2}
      style={{
        data: {
          fill: ({ x }) => podColor[x],
        },
      }}
    />
  );
};

export default PodStatus;
