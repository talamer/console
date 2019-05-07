import * as React from 'react';
import {VictoryPie} from 'victory';

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
const podStatus = ['Running', 'Empty', 'Warning', 'Failed', 'Not Ready', 'Pulling', 'Pending', 'Succceeded', 'Terminating', 'Unknown']
type PodStatusProps = {
  innerRadius: number;
  outerRadius: number;
  x: number;
  y: number;
  height: number;
  width: number;
  data: any;
};

export default class PodStatus extends React.PureComponent<PodStatusProps> {

  render() {
    let { innerRadius, outerRadius, height, width, data} = this.props;
    console.log('#### - 1', data)
    let vData = [];
    podStatus.forEach((pod) => {
      let podNumber = 0;
      data.forEach(element => {
        if(element.status.phase === pod) {
          podNumber += 1;
        }
      });
      if (podNumber !== 0) vData.push({x: pod, y: podNumber})
    })
    console.log('##############', vData);
    const centerTransform = `translate(-63, -63)`;
    return (
      <VictoryPie
        animate={{
          duration: 2000
        }}
        standalone={false}
        innerRadius={innerRadius}
        radius={outerRadius}
        // origin={{x: this.props.x, y: this.props.y}}
        groupComponent={<g transform={centerTransform} />}
        data={vData}
        height={height}
        width={width}
        label={null}
        padAngle={1}
        style={{
          data: {
            fill: ({x}) => podColor[x]
          }
        }}
      />
    );
  }
}