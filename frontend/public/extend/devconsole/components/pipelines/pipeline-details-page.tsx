import * as React from 'react';
import { DetailsPage } from '../../../../components/factory';
import { navFactory } from '../../../../components/utils';
import PipelinEnvironmentComponent from './pipeline-environment';
import PipelineDetails from './pipeline-details';
import PipelineRuns from './pipeline-run';

const PipelineDetailsPage = props => <DetailsPage
  {...props}
  pages={[
    navFactory.details(PipelineDetails),
    navFactory.editYaml(),

    {
      href: 'Runs',
      name: 'Runs',
      component: PipelineRuns,
    },
    navFactory.envEditor(PipelinEnvironmentComponent),
  ]}
/>;

export default PipelineDetailsPage;
