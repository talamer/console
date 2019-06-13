/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { CheckboxField } from '../../formik-fields';
import FormSection from '../section/FormSection';

const RouteSection: React.FC = () => {
  return (
    <FormSection title="Routing" divider>
      <CheckboxField
        type="checkbox"
        name="route.create"
        label="Create a route to the application"
      />
    </FormSection>
  );
};

export default RouteSection;
