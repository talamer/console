import * as React from 'react';
import { DetailsPage } from '../../../../components/factory';
import { navFactory } from '../../../../components/utils';
import PipelinEnvironmentComponent from './PipelineEnvironment';
import PipelineDetails from './PipelineDetails';
import PipelineRuns from './PipelineRuns';

const PipelineDetailsPage = (props) => (
  <DetailsPage
    {...props}
    pages={[
      navFactory.details(PipelineDetails),
      navFactory.editYaml(),

      {
        href: 'Runs',
        name: 'Pipeline Runs',
        component: PipelineRuns,
      },
      navFactory.envEditor(PipelinEnvironmentComponent),
    ]}
  />
);

export default PipelineDetailsPage;
