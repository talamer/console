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
        {pipeline.spec.runs && pipeline.spec.runs[pipeline.spec.runs.length - 1].name
          ? pipeline.spec.runs[pipeline.spec.runs.length - 1].name
          : '-'}
      </div>
      <div className="col-lg-3 col-md-3 col-sm-4 hidden-xs">
        <StatusIcon
          status={
            pipeline.spec.runs && pipeline.spec.runs[pipeline.spec.runs.length - 1].status
              ? pipeline.spec.runs[pipeline.spec.runs.length - 1].status
              : '-'
          }
        />
      </div>
      <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
        <Timestamp
          timestamp={
            pipeline.spec.runs && pipeline.spec.runs[pipeline.spec.runs.length - 1].lastrun
              ? pipeline.spec.runs[pipeline.spec.runs.length - 1].lastrun
              : '-'
          }
        />
      </div>
    </ResourceRow>
  );
};

export default PipelineRow;
