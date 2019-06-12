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

interface configMapKeyType {
  configMapKeyRef: {
    key: string;
    name: string
  }
}

interface secretKeyRefType {
  secretKeyRef: {
    key: string;
    name: string;
  }
}

interface NameValueFormType {
  name: string;
  valueForm: configMapKeyType | secretKeyRefType;
}

interface BuildConfigProps {
  onConfigureWebhookChange: React.ReactEventHandler<HTMLInputElement>;
  onAutomaticallyBuildChange: React.ReactEventHandler<HTMLInputElement>;
  onLaunchFirstBuildChange: React.ReactEventHandler<HTMLInputElement>;
  onEnviromentVariableChange: (envPairs:( NameValueType | NameValueFormType)[]) => void;
  configureWebhookChecked: boolean;
  automaticallyBuildChecked: boolean;
  launchFirstBuildChecked: boolean;
  namespace: string;
  buildConfig?: K8sResourceKind;
  readOnly: boolean;
}

const BuildConfig: React.FC<BuildConfigProps> = ({onConfigureWebhookChange,
  onAutomaticallyBuildChange,
  onLaunchFirstBuildChange,
  onEnviromentVariableChange,
  configureWebhookChecked,
  automaticallyBuildChecked,
  launchFirstBuildChecked,
  namespace,
  buildConfig={},
  readOnly,
}) => {

  const buildConfigObj = _.isEmpty(buildConfig) ? {
    metadata: {
      namespace,
    },
  } : buildConfig;

  return (
    <React.Fragment>
      <div className="co-section-heading">
        Build Configuration
      </div>

      <Checkbox
        name="configureWebhookBuild"
        onChange={onConfigureWebhookChange}
        checked={configureWebhookChecked}>
        Configure a webhook build trigger
      </Checkbox>

      <Checkbox
        name="automaticallyBuildImage"
        onChange={onAutomaticallyBuildChange}
        checked={automaticallyBuildChecked}>
        Automatically build a new image when the builder image changes
      </Checkbox>

      <Checkbox
        name="launchFirstBuild"
        onChange={onLaunchFirstBuildChange}
        checked={launchFirstBuildChecked}>
        Launch the first build when the build configuration is created
      </Checkbox>

      <div>
        <div className="co-section-heading-tertiary">
          Enviroment Variables (Build and Runtime)
        </div>
        <div>
          <EnvironmentPage
            envPath={['spec', 'strategy']}
            obj={buildConfigObj}
            readOnly={readOnly}
            onChange={onEnviromentVariableChange}
            addConfigMapSecret={true}
            useLoadingInline={true} />
        </div>
      </div>
    </React.Fragment>);
};

export default BuildConfig;
