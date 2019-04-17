import * as React from 'react';
import { List } from '../../../../components/factory';
import DevPipelineHeader from './PipelineHeader'
import DevPipelineRow from './PipelineRow'

export const DevPipelineList = props => <List {...props} Header={DevPipelineHeader} Row={DevPipelineRow} />;
export default DevPipelineList;