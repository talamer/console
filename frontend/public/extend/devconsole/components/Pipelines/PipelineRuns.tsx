import * as React from 'react';
import DevPipelineList from './PipelineList';
//mport DevpipelineFilterReducer from './PipelineFilterReducer';
import {  ListPage } from '../../../../components/factory';

/*const filters = [{
  type: 'pipeline-status',
  selected: [ 'Running'],
  reducer: DevpipelineFilterReducer,
  items: [
    { id: 'Running', title: 'Running' },
    { id: 'Failed', title: 'Failed' },
    { id: 'Complete', title: 'Complete' },
  ],
}];*/
const selector = {
  'pipeline' :'pipeline-a' 

};

const DevPipelineRuns = ({obj}) => <div className="co-m-pane__body">
  <div className="row">
    <div className="col-xs-12">
      <div className="panel-body">
      <ListPage
      canCreate={false}
      kind="PipelineRun"
      ListComponent={DevPipelineList}
      selector={selector}
    />
      </div>
    </div>
  </div>
</div>;

export default DevPipelineRuns;
