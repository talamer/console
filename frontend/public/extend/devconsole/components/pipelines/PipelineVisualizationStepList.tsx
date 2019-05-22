/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './PipelineVisualizationStepList.scss';

export interface PipelineVisualizationStepListProps {
  steps: Array<{ name: string }>;
}
export const PipelineVisualizationStepList: React.FC<PipelineVisualizationStepListProps> = ({
  steps,
}) => (
  <ul className="odc-pipeline-vis-steps-list">
    {steps.map((step, i) => {
      return <li key={step.name + i}>{step.name}</li>;
    })}
  </ul>
);
