import * as React from 'react';
import Decorator from './Decorator';
import BaseNode from './BaseNode';
import WorkloadNode from './WorkloadNode';
import { PenIcon } from '@patternfly/react-icons';

type props = {
  height: number;
  wdth: number;
  selected: boolean;
  nodeData: any; //Change this to type of Node Data
  x: number;
  y: number;
  onSelect: Function;
};

type state = {
  height: number;
  data: any; //Change this to type of NodeData
};

const INSTANCE: string = 'app.kubernetes.io/instance';
const COMPONENT: string = 'app.kubernetes.io/component';
const NAME: string = 'app.kubernetes.io/name';

class NodeWrapper extends React.Component<props, state> {
  strokeWidth: number;
  radius: number;
  whiteSpaceBWPodAndOuterRadius: number;
  whiteSpaceBWPodAndInnerRadius: number;
  innerCircleRadius: number;
  workloadNodeInnerRadius: number;
  workloadNodeOuterRadius: number;
  decoratorRadius: number;
  constructor(props) {
    super(props);
    this.state = { height: props.height, data: props.nodeData };
    this.radius = props.radius ? props.radius : this.state.height / 2;
    this.strokeWidth = this.radius * 0.15;
    this.whiteSpaceBWPodAndOuterRadius = this.strokeWidth / 2;
    this.whiteSpaceBWPodAndInnerRadius = this.strokeWidth;
    this.innerCircleRadius =
      this.radius -
      this.strokeWidth -
      this.whiteSpaceBWPodAndInnerRadius -
      this.whiteSpaceBWPodAndOuterRadius;
    this.workloadNodeInnerRadius = this.innerCircleRadius + this.whiteSpaceBWPodAndInnerRadius;
    this.workloadNodeOuterRadius =
      this.innerCircleRadius + this.whiteSpaceBWPodAndInnerRadius + this.strokeWidth;
    this.decoratorRadius = this.radius * 0.25;
  }

  //TODO create a method to get the label
  getNodeLabel = () => {
    const dcData = this.state.data.resource.filter(
      (r) => r.kind === 'DeploymentConfig' || r.kind === 'Deployment',
    );
    const labels = dcData[0].metadata.labels;
    if (labels[INSTANCE] && labels[INSTANCE]) {
      return labels[INSTANCE];
    } else if (labels[COMPONENT] && labels[COMPONENT]) {
      return labels[COMPONENT];
    } else if (labels[NAME] && labels[NAME]) {
      return labels[NAME];
    } else {
      return dcData[0].metadata.name;
    }
  };

  render() {
    const { selected, nodeData, x, y, onSelect } = this.props;
    return (
      <g className="node-wrapper" transform={`translate(${x},${y})`}>
        <BaseNode
          baseOuterRadius={this.radius}
          baseInnerRadius={this.innerCircleRadius}
          icon={nodeData ? nodeData.data.buildImage : undefined} // REMOVE this condition once integrated with dataModel
          label={nodeData ? this.getNodeLabel() : undefined} // REMOVE this condition once integrated with dataModel
          selected={selected}
          onSelect={onSelect}
        />
        <WorkloadNode
          innerRadius={this.workloadNodeInnerRadius}
          outerRadius={this.workloadNodeOuterRadius}
          data={nodeData ? nodeData.data.donutStatus.pods : pods} // REMOVE this condition once integrated with dataModel
        />
        <Decorator
          x={this.radius - this.decoratorRadius}
          y={this.radius - this.decoratorRadius}
          radius={this.decoratorRadius}
        >
          <g transform={`translate(-${this.decoratorRadius / 2}, -${this.decoratorRadius / 2})`}>
            <PenIcon
              className="odc-node-wrapper__pen-con"
              style={{ fontSize: this.decoratorRadius }}
            />
          </g>
        </Decorator>
      </g>
    );
  }
}

const Wrapper = (props) => {
  return <NodeWrapper {...props} />;
};

export default Wrapper;

// Dummy Data, REMOVE this once integrated with data model
const pods = [
  {
    id: 1,
    status: { phase: 'Running' },
    value: 20,
    color: 'yellow',
  },
  {
    id: 2,
    status: { phase: 'Pulling' },
    value: 20,
    color: 'red',
  },
  {
    id: 3,
    value: 20,
    status: { phase: 'Pending' },
    color: 'green',
  },
  {
    id: 4,
    value: 20,
    status: { phase: 'Running' },
    color: 'teal',
  },
  {
    id: 5,
    value: 20,
    status: { phase: 'Running' },
    color: 'blue',
  },
  {
    id: 6,
    value: 20,
    status: { phase: 'Failed' },
    color: 'orange',
  },
];
