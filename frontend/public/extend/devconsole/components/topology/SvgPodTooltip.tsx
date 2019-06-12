/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './SvgPodTooltip.scss';
import SvgDropShadowFilter from '../../shared/components/svg/SvgDropShadowFilter';
import { createSvgIdUrl } from '../../shared/utils/svg-utils';
import { podColor } from './topology-utils';

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

export default class PodTooltip extends React.PureComponent<TooltipProps> {
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
      <g className={'odc-pod-tooltip__label'}>
        <SvgDropShadowFilter id={FILTER_ID} />
        {bb && (
          <React.Fragment>
            <rect
              filter={createSvgIdUrl(FILTER_ID)}
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
            <tspan dx={20}>{Math.round(this.props.datum.y)}</tspan>
          </text>
        </g>
      </g>
    ) : null;
  }
}
