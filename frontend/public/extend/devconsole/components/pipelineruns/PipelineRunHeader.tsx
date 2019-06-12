import * as React from 'react';
import { ColHead, ListHeader } from '../../../../components/factory';

const PipelineHeader = (props) => (
  <ListHeader>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-4 col-xs-4" sortField="metadata.name">
      Name
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-4 col-xs-4" sortField="metadata.labels">
      Started
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-2 col-xs-2" sortFunc="podPhase">
      Status
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortFunc="podReadiness">
      Task Progress
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortFunc="podPhase">
      Duration
    </ColHead>
    <ColHead {...props} className="col-lg-1 col-md-1 hidden-sm hidden-xs" sortFunc="podReadiness">
      Trigger
    </ColHead>
  </ListHeader>
);

export default PipelineHeader;
