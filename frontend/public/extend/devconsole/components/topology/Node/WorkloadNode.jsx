import * as React from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { pie, arc } from 'd3';

// TODO Uncomment this when podColors are available
// import { podColor } from '';

export default class DonutMotion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      innerRadius: props.radius - 1.5,
      outerRadius: props.radius + 1.5,
      style: props.style,
    };
  }

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
    console.log(d);
    return { fill: podColor[d.status.phase] };
  };

  render() {
    const { height, width, data, radius, style, strokeWidth } = this.props;
    const innerRadius = radius - strokeWidth / 2;
    const outerRadius = radius + strokeWidth / 2;
    const pieFunc = pie().sort(null);

    const podData = data.map(() => 100 / data.length);

    const arcFunc = arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .padAngle(0.01);

    const pieData = pieFunc(podData);

    const motionStyles = pieData.map((d, i) => ({
      key: i + '',
      data: { ...d, index: i, podData: this.props.data[i] },
      style: d,
    }));

    const defaultStyles = pieData.map((d, i) => ({
      key: i + '',
      data: { ...d, index: i, podData: this.props.data[i] },
      style: { ...d, endAngle: d.startAngle },
    }));

    const centerTransform = `translate(${width / 2}, ${height / 2})`;

    return (
      <g className="donut" transform={centerTransform}>
        <TransitionMotion
          defaultStyles={defaultStyles}
          styles={motionStyles}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {(interStyles) => (
            <g className="slices">
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
