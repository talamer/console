/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormSectionHeading } from './FormSectionHeading';
import { FormSectionDivider } from './FormSectionDivider';

export interface FormSectionProps {
  title: string;
  divider?: boolean;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, divider, children }) => (
  <React.Fragment>
    <FormSectionHeading title={title} />
    {children}
    {divider && <FormSectionDivider />}
  </React.Fragment>
);
