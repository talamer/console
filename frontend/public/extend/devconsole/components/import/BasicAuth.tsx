/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { Base64 } from 'js-base64';

export type BasicAuthSubFormProps = {
  onChange: (secretsData?: { [key: string]: string }) => void;
  secretCredentials: {
    [key: string]: string;
  };
};

export type BasicAuthSubFormState = {
  username: string;
  password: string;
};

export default class BasicAuthSubform extends React.Component<
  BasicAuthSubFormProps,
  BasicAuthSubFormState
  > {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.secretCredentials.username || '',
      password: this.props.secretCredentials.password || '',
    };
  }

  changeData = (event) => {
    this.setState(
      {
        [event.target.name]: Base64.encode(event.target.value),
      } as BasicAuthSubFormState,
      () => this.props.onChange(this.state),
    );
  };

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            className="form-control"
            id="username"
            aria-describedby="username-help"
            type="text"
            name="username"
            onChange={this.changeData}
            value={Base64.decode(this.state.username)}
          />
          <HelpBlock className="help-block" id="username-help">
            Optional username for Git authentication.
          </HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel className="co-required">Password or Token</ControlLabel>
          <FormControl
            className="form-control"
            id="password"
            aria-describedby="password-help"
            type="password"
            name="password"
            onChange={this.changeData}
            value={Base64.decode(this.state.password)}
            required
          />
          <HelpBlock>
            Password or token for Git authentication. Required if a ca.crt or .gitconfig file is not
            specified.
          </HelpBlock>
        </FormGroup>
      </React.Fragment>
    );
  }
}
