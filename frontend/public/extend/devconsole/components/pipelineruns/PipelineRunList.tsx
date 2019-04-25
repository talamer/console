import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineRunHeader from './PipelineRunHeader';
import PipelineRunRow from './PipelineRunRow';

export const PipelineRunList = (props) => (
  <List {...props} Header={PipelineRunHeader} Row={PipelineRunRow} />
);
export default PipelineRunList;
