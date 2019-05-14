/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { SecretModel } from '../../../../models';
import LabelDropdown from '../../shared/components/dropdown/LabelDropdown';
import { Firehose } from '../../../../components/utils';

interface SourceSecretDropdownProps {
  namespace?: string;
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  selectedKey: string;
  onChange?: (name: string, key: string) => void;
}

const SourceSecretDropdown: React.FC<SourceSecretDropdownProps> = (props) => {
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
      <LabelDropdown
        {...props}
        placeholder="Select Secret Name"
        labelType="Secret"
        labelSelector="type"
      />
    </Firehose>
  );
};

export default SourceSecretDropdown;
