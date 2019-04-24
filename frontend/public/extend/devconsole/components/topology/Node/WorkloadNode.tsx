/* eslint-disable no-unused-vars, no-undef */

import * as React from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { pie, arc } from 'd3';

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

type WorkloadNodeProps = {
  x?: number;
  y?: number;
  data: any;
  innerRadius: number;
  outerRadius: number;
};

export default class WorkloadNode extends React.PureComponent<WorkloadNodeProps, {}> {
  willLeave = ({ style }) => {
    return {
      ...style,
      startAngle: style.endAngle,
    };
  };

  willEnter = ({ style }) => {
    return {
      ...style,
      endAngle: style.startAngle,
    };
  };

  chooseColor = (d, i) => {
    return { fill: podColor[d.status.phase] };
  };

  render() {
    const { data, innerRadius, outerRadius, x = 0, y = 0 } = this.props;
    const pieFunc = pie().sort(null);

    const podData = data.map(() => 100 / data.length);

    const arcFunc = arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .padAngle(0.01);

    const pieData = pieFunc(podData);

    const motionStyles = pieData.map((d, i) => ({
      key: `${i}`,
      data: { ...d, index: i, podData: this.props.data[i] },
      style: d,
    }));

    const defaultStyles = pieData.map((d, i) => ({
      key: `${i}`,
      data: { ...d, index: i, podData: this.props.data[i] },
      style: { ...d, endAngle: d.startAngle },
    }));

    const centerTransform = `translate(${x}, ${y})`;

    return (
      <g transform={centerTransform}>
        <TransitionMotion
          defaultStyles={defaultStyles}
          styles={motionStyles}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {(interStyles) => (
            <g>
              {interStyles.map((c) => (
                <Motion
                  defaultStyle={{
                    ...c.style,
                    endAngle: c.data.startAngle,
                  }}
                  key={c.key}
                  style={{
                    ...c.style,
                    startAngle: spring(c.style.startAngle),
                    endAngle: spring(c.style.endAngle),
                  }}
                >
                  {(interStyle) => (
                    <path
                      d={arcFunc(interStyle)}
                      style={this.chooseColor(c.data.podData, c.data.index)}
                    />
                  )}
                </Motion>
              ))}
            </g>
          )}
        </TransitionMotion>
      </g>
    );
  }
}
