import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading, ResourceSummary, resourcePath } from '../../../../components/utils';
import { PipelineVisualization } from './../pipelines/PipelineVisualization';


const PipelineDetails = ({ obj: pipeline }) => (
  <div className="co-m-pane__body">
    <SectionHeading text="Pipeline Visualization" />
    <PipelineVisualization pipeline={pipeline} />
    <div className="row">
      <div className="col-sm-6">
        <SectionHeading text="Pipeline Overview" />
        <ResourceSummary resource={pipeline} />
      </div>
      <div className="col-sm-6">
        <SectionHeading text="Tasks" />
        <dl>
          {pipeline.spec.tasks.map((task) => {
           const path = resourcePath('Task', task.name, pipeline.metadata.namespace);
            return (
              <React.Fragment key={task.name}>
                <dt>Name: {task.name}</dt>
                <dd>Ref: <Link to={path}>{task.taskRef.name}</Link></dd>
              </React.Fragment>
            );
          })}
        </dl>
      </div>
    </div>
  </div>
);

export default PipelineDetails;
