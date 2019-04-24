import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineHeader from './pipeline-header';
import PipelineRow from './pipeline-row';

export const PipelineList = props => <List {...props} Header={PipelineHeader} Row={PipelineRow} />;
export default PipelineList;
