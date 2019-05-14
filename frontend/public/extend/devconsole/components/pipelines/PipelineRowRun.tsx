/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { StatusIcon, Timestamp } from '../../../../components/utils';

interface PipelineRun {
  metadata: {
    name: string;
  };
  status: {
    conditions: condition[];
    startTime: string;
  };
}

interface condition {
  status: string;
}

const PipelineRowRun = (props) => {
  const getLatestRun = (pipelineRuns: PipelineRun[], sortField: string) => {
    if (!pipelineRuns || pipelineRuns.length === 0) {
      return null;
    }
    if (!sortField) {
      //to support sorting by other specs in future
      return pipelineRuns[0];
    }
    return pipelineRuns[pipelineRuns.length - 1]; // already sorted by creationTimeStamp
  };

  const latestRun = getLatestRun(props.pipelineruns.data, 'creationTimeStamp');
  return (
    <>
      <div className="col-lg-3 col-md-3 col-sm-4 hidden-xs">
        {latestRun && latestRun.metadata && latestRun.metadata.name ? latestRun.metadata.name : '-'}
      </div>
      <div className="col-lg-3 col-md-3 col-sm-4 hidden-xs">
        <StatusIcon
          status={
            latestRun &&
            latestRun.status &&
            latestRun.status.conditions[0] &&
            latestRun.status.conditions[0].status
              ? latestRun.status.conditions[0].status === 'True'
                ? 'Succeeded'
                : 'Failed'
              : '-'
          }
        />
      </div>
      <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
        <Timestamp
          timestamp={
            latestRun && latestRun.status && latestRun.status.startTime
              ? latestRun.status.startTime
              : '-'
          }
        />
      </div>
    </>
  );
};

export default PipelineRowRun;
