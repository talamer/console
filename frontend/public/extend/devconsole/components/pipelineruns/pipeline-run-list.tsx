import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineRunHeader from './pipeline-run-header';
import PipelineRunRow from './pipeline-run-row';

export const PipelineRunList = props => <List {...props} Header={PipelineRunHeader} Row={PipelineRunRow} />;
export default PipelineRunList;
