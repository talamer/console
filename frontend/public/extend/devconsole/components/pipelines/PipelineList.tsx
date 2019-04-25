import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';

export const PipelineList = (props) => (
  <List {...props} Header={PipelineHeader} Row={PipelineRow} />
);
export default PipelineList;
