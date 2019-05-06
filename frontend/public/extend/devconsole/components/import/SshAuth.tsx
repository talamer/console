/* eslint-disable no-unused-vars, no-undef */
import { AsyncComponent } from '../../../../components/utils/async';
import * as React from 'react';

export type SSHAuthSubformProps = {
  onChange: (secretsData?: { [key: string]: string }) => void;
  secretCredentials: {
    [key: string]: string;
  };
};

export type SSHAuthSubformState = {
  sshPrivateKey: string;
};

const DroppableFileInput = (props) => (
  <AsyncComponent
    loader={() =>
      import('../../../../components/utils/file-input').then((c) => c.DroppableFileInput)
    }
    {...props}
  />
);

export default class SSHAuthSubform extends React.Component<
  SSHAuthSubformProps,
  SSHAuthSubformState
  > {
  constructor(props) {
    super(props);
    this.state = {
      sshPrivateKey: this.props.secretCredentials.sshPrivateKey || '',
    };
  }

  changeData = (event) => {
    this.setState(
      {
        sshPrivateKey: event.target.value,
      },
      () => this.props.onChange(this.state),
    );
  };

  onFileChange = (fileData) => {
    this.setState(
      {
        sshPrivateKey: fileData,
      },
      () => this.props.onChange(this.state),
    );
  };

  render() {
    return (
      <DroppableFileInput
        onChange={this.onFileChange}
        inputFileData={this.state.sshPrivateKey}
        id="ssh-privatekey"
        label="SSH Private Key"
        inputFieldHelpText="Drag and drop file with your private SSH key here or browse to upload it."
        textareaFieldHelpText="Private SSH key file for Git authentication."
        isRequired={true}
      />
    );
  }
}
