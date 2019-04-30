/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';

import LabelDropdown from './LabelDropdown';
import { Firehose } from '../../../../../components/utils';

interface AppDropdownProps {
  namespace?: string;
  actionItem?: {
    actionTitle: string,
    actionKey: string,
  };
  selectedKey: string,
  onChange?: (name: string, key: string) => void;
}

const AppDropdown: React.FC<AppDropdownProps> = (props) => {
  const resources = [
    {
      isList: true,
      namespace: props.namespace,
      kind: 'DeploymentConfig',
      prop: 'deploymentConfigs',
    },
    {
      isList: true,
      namespace: props.namespace,
      kind: 'Deployment',
      prop: 'deployments',
    }
  ];
  return (
    <Firehose resources={resources}>
      <LabelDropdown
        {...props}
        placeholder="Select an Application"
        labelType="Application"
        labelSelector="app.kubernetes.io/part-of"
      />
    </Firehose>
  );
};

export default AppDropdown;
