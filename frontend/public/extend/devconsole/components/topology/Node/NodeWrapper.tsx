import * as React from 'react';
import Decorator from './Decorator';
import BaseNode from './BaseNode';
import WorkloadNode from './WorkloadNode';

const NodeWrapper = (props) => {
  const {height, width, selected, nodeData, x, y} = props;
  const radius = props.radius ? props.radius : height / 2;
  const strokeWidth: number =  radius * .25;
  const commonNodeProps = {
    height, width, radius, strokeWidth
  }
  //TODO create a method to get the label
  //
  return (
    <g className="node-wrapper"
      transform={`translate(${x},${y})`}
    >
      <BaseNode {...commonNodeProps} icon={nodeData ? nodeData.data.buildImage : 'nodejs'} selected={selected} />
      <WorkloadNode {...commonNodeProps} data={nodeData ? nodeData.data.donutStatus.pods : pods} />
      <Decorator radius={radius} />
    </g>
  );
}

export default NodeWrapper;


const pods = [
  {
    id: 1,
    status: {phase : "Running"},
    value: 20,
    color: "yellow",
  },
  {
    id: 2,
    status: {phase : "Pulling"},
    value: 20,
    color: "red",
  },
  {
    id: 3,
    value: 20,
    status: {phase : "Pending"},
    color: 'green'
  },
  {
    id: 4,
    value: 20,
    status: {phase : "Running"},
    color: 'teal'
  },
  {
    id: 5,
    value: 20,
    status: {phase : "Running"},
    color: 'blue'
  },
  {
    id: 6,
    value: 20,
    status: {phase : "Failed"},
    color: 'orange'
  }
]