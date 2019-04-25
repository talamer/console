import * as React from 'react';
import { ColHead, ListHeader } from '../../../../components/factory';

const PipelineHeader = (props) => (
  <ListHeader>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 col-xs-6" sortField="metadata.name">
      Name
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 col-xs-6" sortField="metadata.labels">
      Started
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 hidden-xs" sortFunc="podPhase">
      Status
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortFunc="podReadiness">
      Task Progress
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortFunc="podPhase">
      Duration
    </ColHead>
    <ColHead {...props} className="col-lg-2 col-md-2 col-sm-3 hidden-xs" sortFunc="podReadiness">
      Trigger
    </ColHead>
  </ListHeader>
);

export default PipelineHeader;
