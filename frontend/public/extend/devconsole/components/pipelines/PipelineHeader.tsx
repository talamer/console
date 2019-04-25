import * as React from 'react';
import { ColHead, ListHeader } from '../../../../components/factory';

const PipelineHeader = (props) => (
  <ListHeader>
    <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="metadata.name">
      Name
    </ColHead>
    <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
      Last Run
    </ColHead>
    <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 hidden-xs">
      Last Run Status
    </ColHead>
    <ColHead {...props} className="col-lg-3 col-md-3 hidden-sm hidden-xs">
      Last Run time
    </ColHead>
  </ListHeader>
);

export default PipelineHeader;
