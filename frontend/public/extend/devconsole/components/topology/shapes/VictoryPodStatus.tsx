import * as React from 'react';
import { VictoryPie } from 'victory';
import './DefaultGroup.scss';
import SvgDropShadowFilter from './../../../shared/components/svg/SvgDropShadowFilter';
import { createFilterIdUrl } from './../../../shared/utils/svg-utils';
import { Pod } from '../topology-types';

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
  standalone: boolean
  data: Pod[];
  showTooltip?: boolean
};

export default class PodStatus extends React.PureComponent<PodStatusProps> {

  render() {
    let { innerRadius, outerRadius, data, size, standalone, showTooltip = true } = this.props;
    let vData = [];
    podStatus.forEach((pod) => {
      let podNumber = 0;
      data.forEach((element) => {
        if (element.status.phase === pod) {
          podNumber += 1;
        }
      });
      if (podNumber !== 0)
        vData.push({ x: pod, y: podNumber});
    });
    const centerTransform = `translate(-63, -63)`;
    return (
      <VictoryPie
        events={showTooltip ? [
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
        ]: []}
        animate={{
          duration: 2000,
        }}
        standalone={standalone}
        innerRadius={innerRadius}
        radius={outerRadius}
        // origin={{x: this.props.x, y: this.props.y}}
        groupComponent={<g transform={centerTransform} />}
        data={vData}
        height={size}
        width={size}
        labelComponent={<Tooltip x={outerRadius + 2} y={-12} />}
        padAngle={2}
        style={{
          data: {
            fill: ({ x }) => podColor[x],
          }
        }}
      />
    );
  }
}

type TooltipProps = {
  datum?: any;
  active?: boolean;
  x: number;
  y: number;
};

type State = {
  bb: SVGRect;
};

const FILTER_ID = 'PodTOOLTIP';

class Tooltip extends React.PureComponent<TooltipProps> {
  state: State = {
    bb: null,
  };

  groupRef = React.createRef<SVGGElement>();

  componentDidMount() {
    this.computeBoxSize();
  }

  componentDidUpdate({ datum }: TooltipProps) {
    if (this.props.datum !== datum) {
      this.computeBoxSize();
    }
  }

  private computeBoxSize() {
    if (this.props.active) {
      this.setState({ bb: this.groupRef.current.getBBox() });
    }
  }

  render() {
    const { bb } = this.state;
    const { x, y } = this.props;
    const paddingX = 20;
    const paddingY = 5;
    return this.props.active ? (
      <g className={'odc-default-group__label'}>
        <SvgDropShadowFilter id={FILTER_ID} />
        {bb && (
          <React.Fragment>
            <rect
              filter={createFilterIdUrl(FILTER_ID)}
              x={x - paddingX - bb.width / 2}
              width={bb.width + paddingX * 2}
              y={y - paddingY - bb.height / 2}
              height={bb.height + paddingY * 2}
            />
            <rect
              width={10}
              height={10}
              x={x - bb.width / 2 - paddingX / 2}
              y={y - paddingY}
              style={{ fill: podColor[this.props.datum.x] }}
            />
          </React.Fragment>
        )}
        <g ref={this.groupRef}>
          <text x={x} y={y} dx={10} textAnchor="middle" dy="0.3em">
            <tspan>{this.props.datum.x}</tspan>
            <tspan dx={20}>{this.props.datum.pods}</tspan>
          </text>
        </g>
      </g>
    ) :
    null;
  }
}
