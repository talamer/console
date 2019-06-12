/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { ExpandCollapse, HelpBlock } from 'patternfly-react';
import { InputField, DropdownField } from '../../formik-fields';
import { GitTypes, ProjectData } from '../import-types';
import { detectGitType } from '../import-validation-utils';
import FormSection from '../section/FormSection';
import SourceSecretSelector from './SourceSecretSelector';

export interface GitSectionProps {
  project: ProjectData;
}

const GitSection: React.FC<GitSectionProps> = ({ project }) => {
  const { values, setValues, setFieldTouched } = useFormikContext<FormikValues>();
  const handleGitUrlBlur = () => {
    const gitType = detectGitType(values.git.url);
    const showGitType = gitType === '' ? true : false;
    const newValues = {
      ...values,
      git: {
        ...values.git,
        type: gitType,
        showGitType,
      },
    };
    setValues(newValues);
    setFieldTouched('git.url', true);
    setFieldTouched('git.type', showGitType);
  };

  return (
    <FormSection title="Git" divider>
      <InputField
        type="text"
        name="git.url"
        label="Git Repo URL"
        onBlur={handleGitUrlBlur}
        required
      />
      {values.git.showGitType && (
        <DropdownField
          name="git.type"
          label="Git Type"
          items={GitTypes}
          selectedKey={values.git.type}
          title={GitTypes[values.git.type]}
          fullWidth
          required
        />
      )}
      <ExpandCollapse
        textExpanded="Hide Advanced Git Options"
        textCollapsed="Show Advanced Git Options"
      >
        <InputField
          type="text"
          name="git.ref"
          label="Git Reference"
          helpText="Optional branch, tag or commit."
        />
        <InputField
          type="text"
          name="git.dir"
          label="Context Dir"
          helpText="Optional subdirectory for the application source code, used as a context directory for build."
        />
        <SourceSecretSelector namespace={project.name} />
        <HelpBlock>Secret with credentials for pulling your source code.</HelpBlock>
      </ExpandCollapse>
    </FormSection>
  );
};

export default GitSection;
