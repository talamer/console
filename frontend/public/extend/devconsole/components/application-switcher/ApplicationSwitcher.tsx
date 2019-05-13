/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';

import AppDropdown from '../../shared/components/dropdown/AppDropdown';

interface ApplicationSwitcherProps {
  namespace: string;
  application: string;
  selectedKey: string;
  allApplicationsKey: string;
  allNamespacesKey: string;
  storageKey: string;
  onChange: (name: string) => void;
}

const ApplicationSwitcher: React.FC<ApplicationSwitcherProps> = (props) => {
  const onApplicationChange = (newApplication, key) => {
    key === props.allApplicationsKey ? props.onChange(key) : props.onChange(newApplication);
  };
  const allApplicationsTitle = 'all applications';

  let disabled: boolean = false;
  if (props.namespace === props.allNamespacesKey) {
    disabled = true;
  }

  let title: string = props.application;
  if (title === props.allApplicationsKey && !disabled) {
    title = allApplicationsTitle;
  } else if (disabled) {
    title = 'No applications';
  }

  return (
    <AppDropdown
      className="co-namespace-selector"
      menuClassName="co-namespace-selector__menu dropdown-menu--right"
      buttonClassName="btn-link"
      namespace={props.namespace}
      title={title && <span className="btn-link__title">{title}</span>}
      titlePrefix="Application"
      allApplicationsKey={props.allApplicationsKey}
      selectedKey={props.selectedKey}
      onChange={onApplicationChange}
      storageKey={props.storageKey}
      canFavorite
      disabled={disabled}
    />
  );
};

export default ApplicationSwitcher;
