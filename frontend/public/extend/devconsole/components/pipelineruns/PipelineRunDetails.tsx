/* eslint-disable no-undef  */
import * as React from 'react';
import { SectionHeading, ResourceSummary } from '../../../../components/utils';
import { PipelineRunVisualization } from './PipelineRunVisualization';
import { K8sResourceKind } from '../../../../module/k8s';

interface pipelineRunDetailsProps {
  obj: K8sResourceKind;
}
export const PipelineRunDetails: React.FC<pipelineRunDetailsProps> = ({ obj }) => {
  return (
    <div className="co-m-pane__body">
      <SectionHeading text="Pipeline Run Visualization" />
      <PipelineRunVisualization pipelineRun={obj} />
      <div className="row">
        <div className="col-sm-6">
          <SectionHeading text="Pipeline Run Overview" />
          <ResourceSummary resource={obj} />
        </div>
      </div>
    </div>
  );
};
