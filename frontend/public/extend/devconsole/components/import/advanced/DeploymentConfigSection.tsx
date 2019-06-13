/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormSection } from '../section/FormSection';
import { CheckboxField, EnvironmentField } from '../../formik-fields';

export interface DeploymentConfigSectionProps {
  namespace: string;
}

const DeploymentConfigSection: React.FC<DeploymentConfigSectionProps> = ({ namespace }) => {
  const deploymentConfigObj = {
    metadata: {
      namespace,
    },
  };

  return (
    <FormSection title="Deployment Configuration" divider>
      <CheckboxField
        type="checkbox"
        name="deployment.triggers.image"
        label="Auto deploy when new image is available"
      />
      <CheckboxField
        type="checkbox"
        name="deployment.triggers.config"
        label="Auto deploy when deployment configuration changes"
      />
      <EnvironmentField
        name="deployment.env"
        label="Environment Variables (Runtime only)"
        obj={deploymentConfigObj}
        envPath={['spec', 'template', 'spec', 'containers']}
      />
    </FormSection>
  );
};

export default DeploymentConfigSection;
