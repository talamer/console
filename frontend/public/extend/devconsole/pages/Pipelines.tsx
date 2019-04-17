import * as React from 'react';
import * as _ from 'lodash-es';
import DevPipelineList from '../components/Pipelines/PipelineList';
import DevpipelineFilterReducer from '../components/Pipelines/PipelineFilterReducer';
import {  ListPage } from '../../../components/factory';


const filters = [{
  type: 'pipeline-status',
  selected: [ 'Running'],
  reducer: DevpipelineFilterReducer,
  items: [
    { id: 'Running', title: 'Running' },
    { id: 'Failed', title: 'Failed' },
    { id: 'Complete', title: 'Complete' },
  ],
}];

class DevPipelinesPage extends React.Component<DevPipelinesPageProps> {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    return(
    <ListPage
      canCreate={false}
      kind="Pipeline"
      ListComponent={DevPipelineList}
      rowFilters={filters}
      namespace={this.props.namespace}
    />
    );
  }
}

interface DevPipelinesPageProps{
  canCreate: boolean;
  namespace: string
}
export default DevPipelinesPage;
