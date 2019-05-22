import * as React from 'react';
import { SectionHeading, ResourceSummary, ResourceLink } from '../../../../components/utils';
import { PipelineVisualization } from './../pipelines/PipelineVisualization';
import { TaskModel } from '../../../../models';
import { referenceForModel } from '../../../../module/k8s';

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
            return (
              <React.Fragment key={task.name}>
                <dt>Name: {task.name}</dt>
                <dd>
                  Ref:{' '}
                  <ResourceLink
                    kind={referenceForModel(TaskModel)}
                    name={task.taskRef.name}
                    namespace={pipeline.metadata.namespace}
                    title={task.taskRef.name}
                    inline
                  />
                </dd>
              </React.Fragment>
            );
          })}
        </dl>
      </div>
    </div>
  </div>
);

export default PipelineDetails;
