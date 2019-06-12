/*eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { Checkbox } from 'patternfly-react';
import { EnvironmentPage } from '../../../../../components/environment';
import { K8sResourceKind } from '../../../../../module/k8s';

interface NameValueType {
  name: string;
  value: string;
}

interface secretKeyRefType {
  secretKeyRef: {
    key: string;
    name: string;
  }
}

interface configMapKeyType {
  configMapKeyRef: {
    key: string;
    name: string
  }
}

interface NameValueFormType {
  name: string;
  valueForm: configMapKeyType | secretKeyRefType;
}

interface DeploymentConfigProps {
  onNewImageAvailableChange: React.ReactEventHandler<HTMLInputElement>;
  onDeploymentConfigChange: React.ReactEventHandler<HTMLInputElement>;
  onEnviromentVariableChange: (envPairs: (NameValueType | NameValueFormType)[]) => void;
  newImageAvailableChecked: boolean;
  deploymentConfigChecked: boolean;
  namespace: string;
  deploymentConfig?: K8sResourceKind;
  readonly: boolean;
}

const DeploymentConfig: React.FC<DeploymentConfigProps> = ({onNewImageAvailableChange,
  onDeploymentConfigChange,
  onEnviromentVariableChange,
  newImageAvailableChecked,
  deploymentConfigChecked,
  namespace,
  deploymentConfig = {},
  readonly,
}) => {

  const DeploymentConfigObj = _.isEmpty(deploymentConfig) ? {
    metadata: {
      namespace,
    },
  } : deploymentConfig;

  return (
    <React.Fragment>
      <div className="co-section-heading">
        Deployment Configuration
      </div>
      <div className="co-section-heading-tertiary">
        Autodeploy when
      </div>

      <Checkbox
        name="newImageAvailable"
        onChange={onNewImageAvailableChange}
        checked={newImageAvailableChecked}>
        New image is available
      </Checkbox>

      <Checkbox
        name="deploymentConfigurationChange"
        onChange={onDeploymentConfigChange}
        checked={deploymentConfigChecked}>
        Deployment configuration changes
      </Checkbox>

      <div>
        <div className="co-section-heading-tertiary">
          Enviroment Variables (Build and Runtime)
        </div>
        <div>
          <EnvironmentPage
            obj={DeploymentConfigObj}
            envPath={['spec','template','spec','containers']}
            readOnly={readonly}
            onChange={onEnviromentVariableChange}
            addConfigMapSecret={true}
            useLoadingInline={true} />
        </div>
      </div>
    </React.Fragment>);
};

export default DeploymentConfig;
