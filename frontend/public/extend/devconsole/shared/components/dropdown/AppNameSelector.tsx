/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'patternfly-react';
import AppDropdown from './AppDropdown';

const CREATE_APPLICATION_KEY = 'create-application-key';

interface AppNameSelectorProps {
  namespace?: string;
  application: string;
  selectedKey: string;
  onChange?: (name: string, key: string) => void;
}

const AppNameSelector: React.FC<AppNameSelectorProps> = ({
  application,
  namespace,
  selectedKey,
  onChange,
}) => {
  const onDropdownChange = (appName: string, key: string) => {
    if (key === CREATE_APPLICATION_KEY) {
      onChange('', key);
    } else {
      onChange(appName, key);
    }
  };

  const onInputChange: React.ReactEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value, selectedKey);
  };

  return (
    <React.Fragment>
      <FormGroup>
        <ControlLabel className="co-required">Application</ControlLabel>
        <AppDropdown
          className="dropdown--full-width"
          menuClassName="dropdown-menu--text-wrap"
          namespace={namespace}
          actionItem={{
            actionTitle: 'Create New Application',
            actionKey: CREATE_APPLICATION_KEY,
          }}
          selectedKey={selectedKey}
          onChange={onDropdownChange}
        />
      </FormGroup>
      {selectedKey === CREATE_APPLICATION_KEY ? (
        <FormGroup>
          <ControlLabel className="co-required">Application Name</ControlLabel>
          <FormControl
            className="form-control"
            type="text"
            onChange={onInputChange}
            value={application}
            aria-describedby="name-help"
            required
          />
          <HelpBlock>Names the application.</HelpBlock>
        </FormGroup>
      ) : null}
    </React.Fragment>
  );
};

export default AppNameSelector;
