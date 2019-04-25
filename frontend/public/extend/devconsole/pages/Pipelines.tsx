/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import PipelineList from '../components/pipelines/PipelineList';
import { pipelineFilterReducer } from '../utils/pipeline-filter-reducer';
import { ListPage } from '../../../components/factory';

const filters = [
  {
    type: 'pipeline-status',
    selected: ['Running', 'Failed', 'Complete'],
    reducer: pipelineFilterReducer,
    items: [
      { id: 'Running', title: 'Running' },
      { id: 'Failed', title: 'Failed' },
      { id: 'Complete', title: 'Complete' },
    ],
  },
];

interface PipelinesPageProps {
  namespace: string;
}

class PipelinesPage extends React.Component<PipelinesPageProps> {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    return (
      <ListPage
        canCreate={false}
        kind="Pipeline"
        ListComponent={PipelineList}
        rowFilters={filters}
        namespace={this.props.namespace}
      />
    );
  }
}

export default PipelinesPage;
