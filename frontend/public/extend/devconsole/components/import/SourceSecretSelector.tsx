/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'patternfly-react';
import SourceSecretDropdown from './SourceSecretDropdown';
import AuthenticationType, { SecretType } from './AuthenticationType';

const CREATE_SOURCE_SECRET = 'create-source-secret';

interface SourceSecretSelectorProps {
  namespace?: string;
  sourceSecret: string;
  selectedKey: string;
  secretCredentials: { [key: string]: string };
  onChange: (
    name: string,
    key: string,
    authType?: string,
    credentials?: { [key: string]: string },
  ) => void;
}

const SourceSecretSelector: React.FC<SourceSecretSelectorProps> = ({
  sourceSecret,
  namespace,
  secretCredentials,
  selectedKey,
  onChange,
}) => {
  const onDropdownChange = (secretName: string, key: string) => {
    if (key === CREATE_SOURCE_SECRET) {
      onChange('', key, SecretType.basicAuth, {});
    } else {
      onChange(secretName, key);
    }
  };

  const onInputChange: React.ReactEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value, selectedKey, SecretType.basicAuth, secretCredentials);
  };

  return (
    <React.Fragment>
      <FormGroup>
        <ControlLabel className="co-required">Source Secret</ControlLabel>
        <SourceSecretDropdown
          dropDownClassName="dropdown--full-width"
          menuClassName="dropdown-menu--text-wrap"
          namespace={namespace}
          actionItem={{
            actionTitle: 'Create New Secret',
            actionKey: CREATE_SOURCE_SECRET,
          }}
          selectedKey={selectedKey}
          onChange={onDropdownChange}
        />
      </FormGroup>
      {selectedKey === CREATE_SOURCE_SECRET ? (
        <React.Fragment>
          <FormGroup>
            <ControlLabel className="co-required">Secret Name</ControlLabel>
            <FormControl
              className="form-control"
              type="text"
              onChange={onInputChange}
              value={sourceSecret}
              aria-describedby="name-help"
              required
            />
            <HelpBlock>Unique name of the new secret.</HelpBlock>
          </FormGroup>
          <FormGroup>
            <AuthenticationType
              onChange={onChange}
              selectedKey={selectedKey}
              secretType={SecretType.basicAuth}
              secretName={sourceSecret}
              secretCredentials={secretCredentials}
            />
          </FormGroup>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default SourceSecretSelector;
