import * as React from 'react';
import cx from 'classnames';
import { useField, useFormikContext, FormikValues } from 'formik';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'patternfly-react';
import { Dropdown, NsDropdown } from '../../../../components/utils';

export interface InputFieldProps {
  type?: string;
  name: string;
  label: string;
  helpText?: string;
  required?: boolean;
  onChange?: (event) => void;
  onBlur?: (event) => void;
}

export interface DropdownFieldProps extends InputFieldProps {
  items: object;
  selectedKey: string;
  title: React.ReactNode;
  dropDownClassName?: string;
}

export interface NSDropdownFieldProps extends InputFieldProps {
  selectedKey: string;
  dropDownClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, helpText, ...props }) => {
  const [field, { touched, error }] = useField(props.name);
  return (
    <FormGroup controlId={`${props.name}-field`} className={cx({ 'has-error': touched && error })}>
      <ControlLabel className={cx({ 'co-required': props.required })}>{label}</ControlLabel>
      <FormControl {...field} {...props} aria-describedby={`${props.name}-help`} />
      {helpText && <HelpBlock id={`${props.name}-help`}>{helpText}</HelpBlock>}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export const DropdownField: React.FC<DropdownFieldProps> = ({ label, helpText, ...props }) => {
  const [field, { touched, error }] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  return (
    <FormGroup controlId={`${props.name}-field`} className={cx({ 'has-error': touched && error })}>
      <ControlLabel className={cx({ 'co-required': props.required })}>{label}</ControlLabel>
      <Dropdown
        id={`${props.name}-field`}
        {...field}
        {...props}
        onChange={(value: string) => setFieldValue(props.name, value)}
        onBlur={() => setFieldTouched(props.name, true)}
      />
      {helpText && <HelpBlock id={`${props.name}-help`}>{helpText}</HelpBlock>}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

export const NSDropdownField: React.FC<NSDropdownFieldProps> = ({ label, helpText, ...props }) => {
  const [field, { touched, error }] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  return (
    <FormGroup controlId={`${props.name}-field`} className={cx({ 'has-error': touched && error })}>
      <ControlLabel className={cx({ 'co-required': props.required })}>{label}</ControlLabel>
      <NsDropdown
        id={`${props.name}-field`}
        {...field}
        {...props}
        onChange={(value: string) => setFieldValue(props.name, value)}
        onBlur={() => setFieldTouched(props.name, true)}
      />
      {helpText && <HelpBlock id={`${props.name}-help`}>{helpText}</HelpBlock>}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};
