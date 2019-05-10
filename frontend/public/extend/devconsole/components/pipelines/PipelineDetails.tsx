import * as React from 'react';
import { SectionHeading, ResourceSummary } from '../../../../components/utils';

import PipelineVisualization from '../../shared/components/pipelineVisualization';

const PipelineDetails = ({ obj: pipeline }) => (
  <div className="co-m-pane__body">
    <div className="row">
      <div className="col-sm-6">
        <SectionHeading text="Pipeline Overview" />
        <ResourceSummary resource={pipeline} />
      </div>
      <div className="col-sm-6">
        <PipelineVisualization pipeline={pipeline} />
      </div>
    </div>
  </div>
);

export default PipelineDetails;
