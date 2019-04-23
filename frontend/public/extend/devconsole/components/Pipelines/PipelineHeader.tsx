import * as React from 'react';
import { ColHead, ListHeader } from '../../../../components/factory';

const PipelineHeader = props => <ListHeader>
  <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="metadata.name">Pipeline Name</ColHead>
  <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="metadata.labels">Last Run</ColHead>
  <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 hidden-xs" sortFunc="podPhase">Last Run Status</ColHead>
  <ColHead {...props} className="col-lg-3 col-md-3 hidden-sm hidden-xs" sortFunc="podReadiness">Last Run time</ColHead>
</ListHeader>;

export default PipelineHeader;
