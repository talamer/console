/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import SvgDropShadowFilter from '../../../shared/components/svg/SvgDropShadowFilter';
import { createFilterIdUrl } from '../../../shared/utils/svg-utils';
import './Decorator.scss';

type DecoratorTypes = {
  x: number;
  y: number;
  radius: number;
  onClick?(): void;
  href?: string;
  external?: boolean;
  title: string;
};

const FILTER_ID = 'DecoratorDropShadowFilterId';

const Decorator: React.FunctionComponent<DecoratorTypes> = ({
  x,
  y,
  radius,
  onClick,
  children,
  href,
  external,
  title,
}) => {
  const decorator = (
    <g
      className="odc-decorator"
      transform={`translate(${x}, ${y})`}
      onClick={
        onClick
          ? (e) => {
            e.stopPropagation();
            onClick();
          }
          : null
      }
    >
      <SvgDropShadowFilter id={FILTER_ID} floodOpacity={0.5} />
      <title>{title}</title>
      <circle
        className="odc-decorator__bg"
        cx={0}
        cy={0}
        r={radius}
        filter={createFilterIdUrl(FILTER_ID)}
      />
      {children}
    </g>
  );
  if (href) {
    return (
      /*
        // @ts-ignore */
      <a xlinkHref={href} target={external ? '_blank' : null}>
        {decorator}
      </a>
    );
  }
  return decorator;
};

export default Decorator;
