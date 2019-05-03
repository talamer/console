/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import SvgDropShadowFilter from '../../../shared/components/svg/SvgDropShadowFilter';
import { getImageForIconClass } from '../../../../../components/catalog/catalog-item-icon';
import { createFilterIdUrl } from '../../../shared/utils/svg-utils';
import './BaseNode.scss';

interface State {
  hover?: boolean;
}

export interface BaseNodeProps {
  x?: number;
  y?: number;
  outerRadius: number;
  innerRadius?: number;
  selected: boolean;
  onSelect?: Function;
  icon?: string;
  label?: string;
  children?: React.ReactNode;
  attachments?: React.ReactNode;
}

const FILTER_ID = 'BaseNodeDropShadowFilterId';
const FILTER_ID_HOVER = 'BaseNodeDropShadowFilterId--hover';

export default class BaseNode extends React.Component<BaseNodeProps, State> {
  state: State = {};

  render() {
    const {
      x = 0,
      y = 0,
      outerRadius,
      innerRadius = outerRadius / 1.4,
      selected,
      icon,
      label,
      onSelect,
      children,
      attachments,
    } = this.props;
    const { hover } = this.state;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <g
          onClick={
            onSelect
              ? (e) => {
                e.stopPropagation();
                onSelect();
              }
              : null
          }
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
        >
          <SvgDropShadowFilter id={FILTER_ID} />
          <SvgDropShadowFilter id={FILTER_ID_HOVER} dy={3} stdDeviation={7} floodOpacity={0.24} />
          <circle
            className="odc-base-node__bg"
            cx={0}
            cy={0}
            r={outerRadius}
            filter={hover ? createFilterIdUrl(FILTER_ID_HOVER) : createFilterIdUrl(FILTER_ID)}
          />
          <image
            x={-innerRadius}
            y={-innerRadius}
            width={innerRadius * 2}
            height={innerRadius * 2}
            xlinkHref={
              getImageForIconClass(`icon-${icon}`) || getImageForIconClass('icon-openshift')
            }
          />
          <text
            className="odc-base-node__label"
            textAnchor="middle"
            y={outerRadius + 10}
            x={0}
            dy="0.6em"
          >
            {label}
          </text>
          {selected && (
            <circle
              className="odc-base-node__selection"
              cx={0}
              cy={0}
              r={outerRadius + 1}
              strokeWidth={2}
            />
          )}
          {children}
        </g>
        {attachments}
      </g>
    );
  }
}
