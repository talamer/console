/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import SvgDropShadowFilter from '../../../shared/components/svg/SvgDropShadowFilter';
import { getImageForIconClass } from '../../../../../components/catalog/catalog-item-icon';
import './BaseNode.scss';

type BaseNodeProps = {
  x?: number;
  y?: number;
  outerRadius: number;
  innerRadius?: number;
  selected: boolean;
  onSelect?: Function;
  icon?: string;
  label?: string;
  children?: React.ReactNode;
};

const FILTER_ID = 'BaseNodeDropShadowFilterId';

const BaseNode: React.FunctionComponent<BaseNodeProps> = ({
  x = 0,
  y = 0,
  outerRadius,
  innerRadius = outerRadius / 1.4,
  selected,
  icon,
  label,
  onSelect,
  children,
}: BaseNodeProps) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={
        onSelect
          ? (e) => {
            e.stopPropagation();
            onSelect();
          }
          : null
      }
    >
      <SvgDropShadowFilter id={FILTER_ID} />
      <circle cx={0} cy={0} r={outerRadius} fill="#fff" filter={`url(#${FILTER_ID})`} />
      <image
        x={-innerRadius}
        y={-innerRadius}
        width={innerRadius * 2}
        height={innerRadius * 2}
        xlinkHref={getImageForIconClass(`icon-${icon}`) || getImageForIconClass('icon-openshift')}
      />
      <text
        className={`odc-base-node__label ${selected ? 'is-selected' : ''}`}
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
  );
};

export default BaseNode;
