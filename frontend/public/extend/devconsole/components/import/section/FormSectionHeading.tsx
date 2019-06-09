import * as React from 'react';
import { SectionHeading } from '../../../../../components/utils';

export interface FormSectionHeadingProps {
  title: string;
}

export const FormSectionHeading: React.FC<FormSectionHeadingProps> = ({ title }) => (
  <SectionHeading text={title} style={{ fontWeight: '500' }} />
);
