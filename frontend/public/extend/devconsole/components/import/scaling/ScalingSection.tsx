/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { FormSection } from '../section/FormSection';
import { NumberSpinnerField } from '../../formik-fields';

const ScalingSection: React.FC = () => {
  return (
    <FormSection
      title="Scaling"
      subTitle="Replicas are scaled manually based on CPU usage."
      divider
    >
      <NumberSpinnerField
        name="replicas"
        label="Replicas"
        helpText="The number of instances of your image."
      />
    </FormSection>
  );
};

export default ScalingSection;
