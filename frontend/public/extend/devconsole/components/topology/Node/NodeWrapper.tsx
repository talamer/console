import * as React from 'react';
import Decorator from './Decorator';
import BaseNode from './BaseNode';
import WorkloadNode from './WorkloadNode';

const NodeWrapper = (props) => {
  const {height, width, selected, nodeData} = props;
  const strokeWidth: number =  3;
  const radius = props.radius ? props.radius : height / 2;
  const commonNodeProps = {
    height, width, radius, strokeWidth
  }
  return (
    <g className="node-wrapper">
      <BaseNode {...commonNodeProps} icon={nodeData.data.image.name || 'mongodb'} selected={selected} />
      <WorkloadNode {...commonNodeProps} data={nodeData.data.donut_status.pods || pods} />
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