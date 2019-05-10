import * as React from 'react';
import { SectionHeading, ResourceSummary } from '../../../../components/utils';

import PipelineVisualization from '../../shared/components/PipelineVisualization';

const PipelineDetails = ({ obj: pipeline }) => (
  <div className="co-m-pane__body">
    <SectionHeading text="Pipeline Overview" />
    <PipelineVisualization pipeline={pipeline} />
    <div className="row">
      <div className="col-sm-6">
        <SectionHeading text="Overview" />
        <ResourceSummary resource={pipeline} />
      </div>
      <div className="col-sm-6">
        <SectionHeading text="Tasks" />
        <dl>
          {pipeline.spec.tasks.map((task) => {
            return (
              <React.Fragment key={task.name}>
                <dt>Name: {task.name}</dt>
                <dd>Ref: {task.taskRef.name}</dd>
              </React.Fragment>
            );
          })}
        </dl>
      </div>
    </div>
  </div>
);

export default PipelineDetails;
