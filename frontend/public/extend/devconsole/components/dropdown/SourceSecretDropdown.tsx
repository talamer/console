/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { SecretModel } from '../../../../models';
import { Firehose } from '../../../../components/utils';
import ResourceDropdown from './ResourceDropdown';

interface SourceSecretDropdownProps {
  dropDownClassName?: string;
  menuClassName?: string;
  namespace?: string;
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  selectedKey: string;
  onChange?: (key: string) => void;
  title?: React.ReactNode;
}

const SourceSecretDropdown: React.FC<SourceSecretDropdownProps> = (props) => {
  const filterData = (item) => {
    return item.type === 'kubernetes.io/basic-auth' || item.type === 'kubernetes.io/ssh-auth';
  };
  const resources = [
    {
      isList: true,
      namespace: props.namespace,
      kind: SecretModel.kind,
      prop: 'secrets',
    },
  ];
  return (
    <Firehose resources={resources}>
      <ResourceDropdown
        {...props}
        placeholder={'Select Secret Name'}
        resourceFilter={filterData}
        dataSelector={['metadata', 'name']}
      />
    </Firehose>
  );
};

export default SourceSecretDropdown;
