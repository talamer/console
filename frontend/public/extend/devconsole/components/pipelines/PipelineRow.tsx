import * as React from 'react';
import { ResourceRow } from '../../../../components/factory';
import { ResourceLink, StatusIcon, Timestamp } from '../../../../components/utils';

const PipelineRow = ({ obj: pipeline }) => {
  return (
    <ResourceRow obj={pipeline}>
      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
        <ResourceLink
          kind="Pipeline"
          name={pipeline.metadata.name}
          namespace={pipeline.metadata.namespace}
          title={pipeline.metadata.uid}
        />
      </div>
      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
        {pipeline.latestRun && pipeline.latestRun.metadata && pipeline.latestRun.metadata.name
          ? pipeline.latestRun.metadata.name
          : '-'}
      </div>
      <div className="col-lg-3 col-md-3 col-sm-4 hidden-xs">
        <StatusIcon
          status={
            pipeline.latestRun &&
            pipeline.latestRun.status &&
            pipeline.latestRun.status.conditions[0].type
              ? pipeline.latestRun.status.conditions[0].type
              : '-'
          }
        />
      </div>
      <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
        <Timestamp
          timestamp={
            pipeline.latestRun &&
            pipeline.latestRun.status &&
            pipeline.latestRun.status.completionTime
              ? pipeline.latestRun.status.completionTime
              : '-'
          }
        />
      </div>
    </ResourceRow>
  );
};

export default PipelineRow;
