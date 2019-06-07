/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { SectionHeading } from '../../../../../components/utils';
import { InputField, NSDropdownField } from '../../formik/CustomFormikFields';
import ApplicationSelector from './ApplicationSelector';
import { ProjectData } from '../import-types';

export interface AppSectionProps {
  project: ProjectData;
}

const AppSection: React.FC<AppSectionProps> = ({ project }) => {
  return (
    <React.Fragment>
      <SectionHeading text="App" style={{ fontWeight: '500' }} />
      <NSDropdownField
        name="project.name"
        label="Project"
        selectedKey={project.name}
        dropDownClassName="dropdown--full-width"
        required
      />
      <ApplicationSelector namespace={project.name} />
      <InputField
        type="text"
        name="name"
        label="Name"
        helpText="Identifies the resources created for this application."
        required
      />
    </React.Fragment>
  );
};

export default AppSection;
