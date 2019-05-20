/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './PipelineVisualizationStepList.scss';

export interface PipelineVisualizationStepListProps {
  steps: Array<{ name: string }>;
}
export const PipelineVisualizationStepList: React.FC<PipelineVisualizationStepListProps> = ({
  steps,
}) => {
  if (steps.length === 0) {
    return null;
  }
  return (
    <ul className="odc-pipeline__steps">
      {steps.map((step, i) => {
        return <li key={step.name + i}>{step.name}</li>;
      })}
    </ul>
  );
};
