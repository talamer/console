/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { pie, arc } from 'd3';
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

type PodStatusProps = {
  x?: number;
  y?: number;
  pods: Pod[];
  innerRadius: number;
  outerRadius: number;
};

export default class PodStatus extends React.PureComponent<PodStatusProps> {
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

  chooseColor = (d) => {
    return { fill: podColor[d.status.phase] };
  };

  render() {
    const { pods, innerRadius, outerRadius, x = 0, y = 0 } = this.props;
    const pieFunc = pie().sort(null);

    const podData = pods.map(() => 100 / pods.length);

    const arcFunc = arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .padAngle(0.01);

    const pieData = pieFunc(podData);

    const motionStyles = pieData.map((d, i) => ({
      key: `${i}`,
      data: { ...d, index: i, podData: this.props.pods[i] },
      style: d,
    }));

    const defaultStyles = pieData.map((d, i) => ({
      key: `${i}`,
      data: { ...d, index: i, podData: this.props.pods[i] },
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
                    <path d={arcFunc(interStyle)} style={this.chooseColor(c.data.podData)} />
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
