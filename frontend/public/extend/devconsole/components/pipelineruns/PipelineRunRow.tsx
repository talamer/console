import * as React from 'react';
import { ResourceRow } from '../../../../components/factory';
import { ResourceLink, StatusIcon, Timestamp } from '../../../../components/utils';

const PipelineRow = ({ obj: pipelinerun }) => {
  return (
    <ResourceRow obj={pipelinerun}>
      <div className="col-lg-2 col-md-2 col-sm-3 col-xs-6">
        <ResourceLink
          kind="PipelineRun"
          name={pipelinerun.metadata.name}
          namespace={pipelinerun.metadata.namespace}
          title={pipelinerun.metadata.name}
        />
      </div>
      <div className="col-lg-2 col-md-2 col-sm-3 col-xs-6">
        <Timestamp
          timestamp={
            pipelinerun.status && pipelinerun.status.startTime ? pipelinerun.status.startTime : '-'
          }
        />
      </div>
      <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs">
        {' '}
        <StatusIcon
          status={
            pipelinerun.status.conditions && pipelinerun.status.conditions[0].type
              ? pipelinerun.status.conditions[0].type
              : '-'
          }
        />
      </div>
      <div className="col-lg-2 col-md-3 col-sm-sm hidden-xs"> 5 of 7 </div>
      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs"> - </div>
      <div className="col-lg-2 col-md-2 hidden-3 hidden-xs">
        {pipelinerun.spec.trigger && pipelinerun.spec.trigger.type
          ? pipelinerun.spec.trigger.type
          : '-'}
      </div>
    </ResourceRow>
  );
};

export default PipelineRow;
