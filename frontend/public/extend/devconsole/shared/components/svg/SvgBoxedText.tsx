/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import SvgDropShadowFilter from './SvgDropShadowFilter';
import { createFilterIdUrl } from '../../utils/svg-utils';

interface State {
  bb: SVGRect;
}

export type SvgBoxedTextProps = {
  children: string;
  className: string;
  paddingX: number;
  paddingY: number;
  x: number;
  y: number;
  cornerRadius?: number;
};

const FILTER_ID = 'SvgBoxedTextDropShadowFilterId';

/**
 * Renders a `<text>` component with a `<rect>` box behind.
 */
export default class SvgBoxedText extends React.PureComponent<SvgBoxedTextProps, State> {
  state: State = {
    bb: null,
  };

  textRef = React.createRef<SVGTextElement>();

  componentDidMount() {
    this.computeBoxSize();
  }

  componentDidUpdate({ children }: SvgBoxedTextProps) {
    if (this.props.children !== children) {
      this.computeBoxSize();
    }
  }

  private computeBoxSize() {
    this.setState({ bb: this.textRef.current.getBBox() });
  }

  render() {
    const {
      children,
      className,
      paddingX,
      paddingY,
      cornerRadius = 4,
      x,
      y,
      ...other
    } = this.props;
    const { bb } = this.state;
    return (
      <g className={className}>
        <SvgDropShadowFilter id={FILTER_ID} />
        {bb && (
          <rect
            filter={createFilterIdUrl(FILTER_ID)}
            x={x - paddingX - bb.width / 2}
            width={bb.width + paddingX * 2}
            y={y - paddingY - bb.height / 2}
            height={bb.height + paddingY * 2}
            rx={cornerRadius}
            ry={cornerRadius}
          />
        )}
        <text {...other} ref={this.textRef} x={x} y={y} textAnchor="middle" dy="0.3em">
          {children}
        </text>
      </g>
    );
  }
}
