/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormGroup, ControlLabel } from 'patternfly-react';
import { useFormikContext, FormikValues, useField } from 'formik';
import { createModalLauncher } from '../../../../../components/factory/modal';
import { getValidationState } from '../../formik-fields/field-utils';
import SourceSecretDropdown from '../../dropdown/SourceSecretDropdown';
import {
  withSecretForm,
  SourceSecretForm,
  SecretTypeAbstraction,
} from '../../../../../components/secrets/create-secret';

const CREATE_SOURCE_SECRET = 'create-source-secret';

interface SourceSecretSelectorProps {
  namespace: string;
  // sourceSecret: string;
  /* onChange: (
    name: string,
    key: string,
    authType?: string,
    credentials?: { [key: string]: string },
  ) => void; */
}

interface CreateSourceSecretModalProps {
  cancel: (e: Event) => void;
  close: () => null;
  namespace: string;
  // onChange: () => void;
  /* secretName: string;*/
}

const CreateSourceSecretModal: React.FC<CreateSourceSecretModalProps> = ({ close,namespace }) => {
  const CreateSourceSecretForm = withSecretForm(SourceSecretForm, true);
  const { setFieldValue } = useFormikContext<FormikValues>();
  const onClose = () => {
    close();
    // setFieldValue('git.secret.selectedKey', '');
    return null;
  }
  return (
    <CreateSourceSecretForm
      onCancel={onClose}
      fixed={{ metadata: { namespace } }}
      secretTypeAbstraction={SecretTypeAbstraction.source}
      explanation={'Source secrets let you authenticate against a Git server.'}
      titleVerb="Create"
      isCreate={true}
    />
  );
};

const sourceSecretModalLauncher = createModalLauncher<CreateSourceSecretModalProps>(
  CreateSourceSecretModal,
);

const SourceSecretSelector: React.FC<SourceSecretSelectorProps> = ({
  // sourceSecret,
  namespace,
  // onChange,
}) => {
  const [selectedKey, { touched, error }] = useField('git.secret.selectedKey');
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  console.log('!!!!!!!!!!!!!!!! ' , selectedKey);
  const onDropdownChange = (key: string) => {
    setFieldTouched('git.secret.selectedKey', true);
    if (key === CREATE_SOURCE_SECRET) {
      /*setFieldValue('git.secretName', '');
      setFieldValue('git.selectedSecret', key);*/
      setFieldValue('git.secret.selectedKey', key);
      sourceSecretModalLauncher({ namespace });
    } else {
      setFieldValue('git.secret.selectedKey', key);
    }
  };

  /* const onInputChange: () => React.ReactEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value, selectedKey.value, SecretType.basicAuth, secretCredentials);
  }; */

  return (
    <React.Fragment>
      <FormGroup
        controlId="source-secret-selector-field"
        validationState={getValidationState(error, touched)}
      >
        <ControlLabel className="co-required">Source Secret</ControlLabel>
        <SourceSecretDropdown
          dropDownClassName="dropdown--full-width"
          menuClassName="dropdown-menu--text-wrap"
          namespace={namespace}
          actionItem={{
            actionTitle: 'Create New Secret',
            actionKey: CREATE_SOURCE_SECRET,
          }}
          selectedKey={selectedKey.value}
          onChange={onDropdownChange} 
        />
      </FormGroup>
    </React.Fragment>
  );
};

export default SourceSecretSelector;
