import * as React from 'react';
import {VictoryPie} from 'victory';


type PodStatusProps = {
  innerRadius: number;
  outerRadius: number;
  x: number;
  y: number;
  height: number;
  width: number;
};

export default class PodStatus extends React.Component<PodStatusProps> {

  render() {

    return (
      <VictoryPie
        standalone={false}
        innerRadius={this.props.innerRadius}
        radius={this.props.outerRadius}
        // origin={{x: this.props.x, y: this.props.y}}
        // groupComponent={<g transform={`translate(0, 0)`} />}
        height={125}
        width={125}
      />
    );
  }
}