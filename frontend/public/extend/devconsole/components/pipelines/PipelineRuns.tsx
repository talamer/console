/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import PipelineRunsList from '../pipelineruns/PipelineRunList';
import { pipelineRunFilterReducer } from '../../utils/pipeline-filter-reducer';
import { ListPage } from '../../../../components/factory';

const filters = [
  {
    type: 'pipelinerun-status',
    selected: ['Succeeded'],
    reducer: pipelineRunFilterReducer,
    items: [
      { id: 'Succeeded', title: 'Complete' },
      { id: 'Failed', title: 'Failed' },
      { id: 'Running', title: 'Running' },
    ],
  },
];

interface PipelineRunsProps {
  obj: any;
}

class PipelineRuns extends React.Component<PipelineRunsProps> {
  render() {
    const selector = {
      'tekton.dev/pipeline': this.props.obj.metadata.name,
    };
    return (
      <ListPage
        showTitle={false}
        canCreate={false}
        kind="PipelineRun"
        namespace={this.props.obj.metadata.namespace}
        selector={selector}
        ListComponent={PipelineRunsList}
        rowFilters={filters}
      />
    );
  }
}

export default PipelineRuns;
