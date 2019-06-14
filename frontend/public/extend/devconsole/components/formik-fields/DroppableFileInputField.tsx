/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormGroup } from 'patternfly-react';
import { FormikValues, useField, useFormikContext } from 'formik';
import { InputFieldProps } from './field-types';
import { DroppableFileInput } from '../../../../components/utils/file-input';

const DroppableFileInputField: React.FC<InputFieldProps> = ({ name, label, helpText }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext<FormikValues>();
  return (
    <FormGroup controlId={`${name}-field`}>
      <DroppableFileInput
        label={label}
        onChange={(fileData: string) => setFieldValue(name, fileData)}
        inputFileData={field.value}
        inputFieldHelpText={helpText}
      />
    </FormGroup>
  );
};

export default DroppableFileInputField;
