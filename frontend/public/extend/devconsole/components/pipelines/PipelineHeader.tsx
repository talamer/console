import * as React from 'react';
import { ColHead, ListHeader } from '../../../../components/factory';

const PipelineHeader = (props) => (
  <ListHeader>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 col-xs-5" sortField="metadata.name">
      Name
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-4 col-xs-5" sortField="latestRun.metadata.name">
      Last Run
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 hidden-xs" sortField="latestRun.status.succeededCondition">
      Last Run Status
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortField="latestRun.status.completionTime">
      Task Status
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortField="latestRun.status.completionTime">
      Last Run time
    </ColHead>
  </ListHeader>
);

export default PipelineHeader;
