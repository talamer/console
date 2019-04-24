/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import PipelineRunsList from '../pipelineruns/pipeline-run-list';
import { pipelineRunFilterReducer } from '../../utils/pipeline-filter-reducer';
import { ListPage } from '../../../../components/factory';

const filters = [{
  type: 'pipelinerun-status',
  selected: [ 'Succeeded'],
  reducer: pipelineRunFilterReducer,
  items: [
    { id: 'Succeeded', title: 'Complete' },
    { id: 'Failed', title: 'Failed' },
    { id: 'Running', title: 'Running' },
  ],
}];

interface PipelineRunsProps{
  pipeline: string;
  obj:any;
}

class PipelineRuns extends React.Component<PipelineRunsProps> {
  render() {
    const selector = {
      'pipeline' : this.props.obj.metadata.name,
    };
    return (<ListPage
      showTitle={false}
      canCreate={false}
      kind="PipelineRun"
      selector={selector}
      ListComponent={PipelineRunsList}
      rowFilters={filters}
    />
    );
  }
}

export default PipelineRuns;
