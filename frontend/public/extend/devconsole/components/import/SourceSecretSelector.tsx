/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'patternfly-react';
import { Dropdown } from '../../../../components/utils';
import SourceSecretDropdown from './SourceSecretDropdown';
import BasicAuthSubform from './BasicAuth';
import SSHAuthSubform from './SshAuth';

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

export enum SecretType {
  basicAuth = 'kubernetes.io/basic-auth',
  sshAuth = 'kubernetes.io/ssh-auth',
}

export type AuthenticationTypeState = {
  type: SecretType;
  stringData: {
    [key: string]: string;
  };
  authType: SecretType.basicAuth | SecretType.sshAuth;
};

export type AuthenticationTypeProps = {
  onChange: Function;
  selectedKey: string;
  secretType: SecretType;
  secretName: string;
  secretCredentials: {
    [key: string]: string;
  };
};

class AuthenticationType extends React.Component<AuthenticationTypeProps, AuthenticationTypeState> {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.secretType,
      stringData: this.props.secretCredentials,
      authType: SecretType.basicAuth,
    };
  }

  onDataChange = (secretsData) => {
    this.setState(
      {
        stringData: { ...secretsData },
      },
      () =>
        this.props.onChange(
          this.props.secretName,
          this.props.selectedKey,
          this.state.type,
          this.state.stringData,
        ),
    );
  };

  changeAuthenticationType = (type: SecretType) => {
    this.setState({
      type,
      stringData: {},
    });
  };

  render() {
    const authTypes = {
      [SecretType.basicAuth]: 'Basic Authentication',
      [SecretType.sshAuth]: 'SSH Key',
    };
    return (
      <React.Fragment>
        <FormGroup controlId="authentication-type">
          <ControlLabel className="co-create-secret__dropdown">Authentication Type</ControlLabel>

          <Dropdown
            items={authTypes}
            dropDownClassName="dropdown--full-width"
            id="dropdown-selectbox"
            selectedKey={this.state.authType}
            onChange={this.changeAuthenticationType}
          />
        </FormGroup>
        {this.state.type === SecretType.basicAuth ? (
          <BasicAuthSubform
            onChange={this.onDataChange}
            secretCredentials={this.state.stringData}
          />
        ) : (
          <SSHAuthSubform onChange={this.onDataChange} secretCredentials={this.state.stringData} />
        )}
      </React.Fragment>
    );
  }
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
