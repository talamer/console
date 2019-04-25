import * as React from 'react';
import { SectionHeading, ResourceSummary } from '../../../../components/utils';

const PipelineDetails = ({ obj: pipeline }) => (
  <div className="co-m-pane__body">
    <div className="row">
      <div className="col-sm-6">
        <SectionHeading text="Pipeline Overview" />
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
