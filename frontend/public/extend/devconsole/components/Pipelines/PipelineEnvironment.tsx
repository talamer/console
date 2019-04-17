import * as React from 'react';
import { AsyncComponent } from '../../../../components/utils';

const DevPipelineEnvironmentTab = (props) => <AsyncComponent loader={() => import('../../../../components/environment.jsx').then(c => c.EnvironmentPage)} {...props} />;

const envPath = ['spec','containers'];
const DevPipelinEnvironmentComponent = (props) => <DevPipelineEnvironmentTab
  obj={props.obj}
  rawEnvData={props.obj.spec}
  envPath={envPath}
  readOnly={true}
/>;

export default DevPipelinEnvironmentComponent;
