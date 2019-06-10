/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { DetailsPage, DetailsPageProps } from '../../../../components/factory';
import { navFactory } from '../../../../components/utils';
import { PipelineRunDetails } from './PipelineRunDetails';

const PipelineRunDetailsPage: React.FC<DetailsPageProps> = (props) => (
  <DetailsPage {...props} pages={[navFactory.details(PipelineRunDetails), navFactory.editYaml()]} />
);

export default PipelineRunDetailsPage;
