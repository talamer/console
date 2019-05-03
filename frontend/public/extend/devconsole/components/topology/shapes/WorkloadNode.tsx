/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PenIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import Decorator from './Decorator';
import BaseNode from './BaseNode';
import PodStatus from './PodStatus';
import { NodeProps, WorkloadData } from '../topology-types';

const WorkloadNode: React.FC<NodeProps<WorkloadData>> = ({
  data: workload,
  x,
  y,
  size,
  selected,
  onSelect,
}) => {
  const radius = size / 2;
  const podStatusStrokeWidth = radius * 0.15;
  const podStatusInset = podStatusStrokeWidth / 2;
  const podStatusOuterRadius = radius - podStatusInset;
  const podStatusInnerRadius = podStatusOuterRadius - podStatusStrokeWidth;
  const decoratorRadius = radius * 0.25;
  return (
    <BaseNode
      x={x}
      y={y}
      outerRadius={radius}
      innerRadius={radius * 0.55}
      icon={workload.data.builderImage}
      label={workload.name}
      selected={selected}
      onSelect={onSelect}
    >
      <PodStatus
        innerRadius={podStatusInnerRadius}
        outerRadius={podStatusOuterRadius}
        pods={workload.data.donutStatus.pods}
      />
      {workload.data.editUrl && (
        <Decorator
          x={radius - decoratorRadius}
          y={radius - decoratorRadius}
          radius={decoratorRadius}
          href={workload.data.editUrl}
          external
          title="Edit Source Code"
        >
          <g transform={`translate(-${decoratorRadius / 2}, -${decoratorRadius / 2})`}>
            <PenIcon style={{ fontSize: decoratorRadius }} />
          </g>
        </Decorator>
      )}
      {workload.data.url && (
        <Decorator
          x={radius - decoratorRadius}
          y={-radius + decoratorRadius}
          radius={decoratorRadius}
          href={workload.data.url}
          external
          title="Open URL"
        >
          <g transform={`translate(-${decoratorRadius / 2}, -${decoratorRadius / 2})`}>
            <ExternalLinkAltIcon style={{ fontSize: decoratorRadius }} />
          </g>
        </Decorator>
      )}
    </BaseNode>
  );
};

export default WorkloadNode;
