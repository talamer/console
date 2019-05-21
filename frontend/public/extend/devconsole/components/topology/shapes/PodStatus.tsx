/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { VictoryPie } from 'victory';
import { Pod } from '../topology-types';
import Tooltip from './../SvgPodTooltip';
import { podColor } from '../topology-utils';
import { podPhase, podPhaseFilterReducer } from './../../../../../../public/module/k8s';

const podStatus = Object.keys(podColor);

type PodData = {
  x: string;
  y: number;
};

type PodStatusProps = {
  innerRadius: number;
  outerRadius: number;
  size: number;
  standalone?: boolean;
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
  standalone = false,
  showTooltip = true,
}) => {
  const vData: PodData[] = [];
  podStatus.forEach((pod) => {
    let podNumber = 0;
    data.forEach((element) => {
      if (podPhaseFilterReducer(element) === pod) {
        podNumber += 1;
      }
    });
    if (podNumber !== 0) {
      vData.push({ x: pod, y: podNumber });
    }
  });
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
          : undefined
      }
      animate={{
        duration: 2000,
      }}
      standalone={standalone}
      innerRadius={innerRadius}
      radius={outerRadius}
      groupComponent={x && y ? <g transform={`translate(${x}, ${y})`} /> : undefined}
      data={vData}
      height={size}
      width={size}
      labelComponent={<Tooltip x={size/2} y={-12} />}
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
