/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { SectionHeading } from '../../../../../components/utils';
import { InputField, DropdownField } from '../../formik/CustomFormikFields';
import { useFormikContext, FormikValues } from 'formik';

enum GitTypes {
  '' = 'Please choose Git type',
  github = 'GitHub',
  gitlab = 'GitLab',
  bitbucket = 'Bitbucket',
}

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
  const handleGitUrlBlur = (e) => {
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
    <React.Fragment>
      <SectionHeading text="Git" style={{ fontWeight: '500' }} />
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
          dropDownClassName="dropdown--full-width"
          required
        />
      )}
    </React.Fragment>
  );
};

export default GitSection;
