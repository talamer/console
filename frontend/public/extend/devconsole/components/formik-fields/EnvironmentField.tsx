/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import cx from 'classnames';
import { useFormikContext, FormikValues } from 'formik';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { EnvironmentFieldProps } from './field-types';
import { EnvironmentPage } from '../../../../components/environment';
import { NameValuePair, NameValueFromPair } from '../import/import-types';

const EnvironmentField: React.FC<EnvironmentFieldProps> = ({ label, helpText, ...props }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  return (
    <FormGroup controlId={`${props.name}-field`}>
      <ControlLabel className={cx({ 'co-required': props.required })}>{label}</ControlLabel>
      <EnvironmentPage
        obj={props.obj}
        envPath={props.envPath}
        readOnly={false}
        onChange={(obj: Array<NameValuePair | NameValueFromPair>) => setFieldValue(props.name, obj)}
        addConfigMapSecret={true}
        useLoadingInline={true}
      />
      {helpText && <HelpBlock id={`${props.name}-help`}>{helpText}</HelpBlock>}
    </FormGroup>
  );
};

export default EnvironmentField;
