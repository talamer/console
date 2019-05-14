/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';

import AppDropdown from '../../shared/components/dropdown/AppDropdown';
import {
  ALL_NAMESPACES_KEY,
  ALL_APPLICATIONS_KEY,
  APPLICATION_LOCAL_STORAGE_KEY,
} from '../../../../../public/const';

interface ApplicationSwitcherProps {
  namespace: string;
  application: string;
  onChange: (name: string) => void;
}

const ApplicationSwitcher: React.FC<ApplicationSwitcherProps> = ({
  namespace,
  application,
  onChange,
}) => {
  const onApplicationChange = (newApplication, key) => {
    key === ALL_APPLICATIONS_KEY ? onChange(key) : onChange(newApplication);
  };
  const allApplicationsTitle = 'all applications';

  let disabled: boolean = false;
  if (namespace === ALL_NAMESPACES_KEY) {
    disabled = true;
  }

  let title: string = application;
  if (title === ALL_APPLICATIONS_KEY && !disabled) {
    title = allApplicationsTitle;
  } else if (disabled) {
    title = 'No applications';
  }

  return (
    <AppDropdown
      className="co-namespace-selector"
      menuClassName="co-namespace-selector__menu dropdown-menu--right"
      buttonClassName="btn-link"
      namespace={namespace}
      title={title && <span className="btn-link__title">{title}</span>}
      titlePrefix="Application"
      allSelectorItem={{
        allSelectorKey: ALL_APPLICATIONS_KEY,
        allSelectorTitle: allApplicationsTitle,
      }}
      selectedKey={application || ALL_APPLICATIONS_KEY}
      onChange={onApplicationChange}
      storageKey={APPLICATION_LOCAL_STORAGE_KEY}
      disabled={disabled}
    />
  );
};

export default ApplicationSwitcher;
