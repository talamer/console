/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { getImageForIconClass } from '../../../../../components/catalog/catalog-item-icon';
import SvgDropShadowFilter from '../../../shared/components/svg/SvgDropShadowFilter';
import { createSvgIdUrl } from '../../../shared/utils/svg-utils';

type KnativeIconProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const FILTER_ID = 'KnativeIconOutlineFilterId';

const KnativeIcon: React.FC<KnativeIconProps> = ({ x, y, width, height }) => (
  <React.Fragment>
    <SvgDropShadowFilter id={FILTER_ID} floodOpacity={0.8} stdDeviation={1} floodColor="#FFFFFF" />
    <image
      x={x}
      y={y}
      width={width}
      height={height}
      xlinkHref={getImageForIconClass('icon-knative')}
      filter={createSvgIdUrl(FILTER_ID)}
    />
  </React.Fragment>
);

export default KnativeIcon;
