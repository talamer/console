/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { PenIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import Decorator from './Decorator';
import BaseNode from './BaseNode';
import PodStatus from './PodStatus';
import { NodeProps, WorkloadData } from '../topology-types';
import { getImageForIconClass } from '../../../../../components/catalog/catalog-item-icon';

const WorkloadNode: React.FC<NodeProps<WorkloadData>> = ({
  data: workload,
  x,
  y,
  size,
  selected,
  onSelect,
}) => {
  const radius = size / 2;
  const podStatusStrokeWidth = 8 / 104 * size;
  const podStatusInset = 5 / 104 * size;
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
      attachments={[
        workload.data.isKnativeResource && (
          <image
            key="knative"
            x={-radius * 0.11}
            y={-radius * 0.65}
            width={radius * 0.39}
            height={radius * 0.31}
            xlinkHref={getImageForIconClass('icon-knative')}
          />
        ),
        workload.data.editUrl && (
          <Decorator
            key="edit"
            x={radius - decoratorRadius * 0.7}
            y={radius - decoratorRadius * 0.7}
            radius={decoratorRadius}
            href={workload.data.editUrl}
            external
            title="Edit Source Code"
          >
            <g transform={`translate(-${decoratorRadius / 2}, -${decoratorRadius / 2})`}>
              <PenIcon style={{ fontSize: decoratorRadius }} />
            </g>
          </Decorator>
        ),
        workload.data.url && (
          <Decorator
            key="route"
            x={radius - decoratorRadius * 0.7}
            y={-radius + decoratorRadius * 0.7}
            radius={decoratorRadius}
            href={workload.data.url}
            external
            title="Open URL"
          >
            <g transform={`translate(-${decoratorRadius / 2}, -${decoratorRadius / 2})`}>
              <ExternalLinkAltIcon style={{ fontSize: decoratorRadius }} />
            </g>
          </Decorator>
        ),
      ]}
    >
      <PodStatus
        x={-size/2}
        y={-size/2}
        innerRadius={podStatusInnerRadius}
        outerRadius={podStatusOuterRadius}
        data={workload.data.donutStatus.pods}
        size={size}
      />
    </BaseNode>
  );
};

export default WorkloadNode;
