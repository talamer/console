/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { InputField, DropdownField } from '../../formik-fields';
import { useFormikContext, FormikValues } from 'formik';
import { FormSection } from '../section/FormSection';
import { GitTypes } from '../import-types';

const detectGitType = (url: string): string => {
  if (url.includes('github.com')) {
    return 'github';
  } else if (url.includes('bitbucket.org')) {
    return 'bitbucket';
  } else if (url.includes('gitlab.com')) {
    return 'gitlab';
  }
  return '';
};

const GitSection: React.FC = () => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  const handleGitUrlBlur = () => {
    const gitType = detectGitType(values.git.url);
    setFieldTouched('git.url', true);
    setFieldValue('git.type', gitType);
    if (gitType) {
      setFieldValue('visibility.gitType', false);
    } else {
      setFieldTouched('git.type', true);
      setFieldValue('visibility.gitType', true);
    }
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
      {values.visibility.gitType && (
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
