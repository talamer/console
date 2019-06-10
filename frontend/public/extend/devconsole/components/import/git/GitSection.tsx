/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { InputField, DropdownField } from '../../formik-fields';
import { FormSection } from '../section/FormSection';
import { GitTypes } from '../import-types';
import { detectGitType } from '../import-validation-utils';

const GitSection: React.FC = () => {
  const { values, setValues, setFieldTouched, validateForm } = useFormikContext<FormikValues>();
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
    validateForm(newValues);
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
    </FormSection>
  );
};

export default GitSection;
