/* eslint-disable no-unused-vars, no-undef, dot-notation */
import * as React from 'react';
import * as _ from 'lodash-es';
import { Form, Button, ExpandCollapse } from 'patternfly-react';
import { FormikProps, FormikValues } from 'formik';
import { ButtonBar } from '../../../../components/utils';
import { NormalizedBuilderImages } from '../../utils/imagestream-utils';
import GitSection from './git/GitSection';
import BuilderSection from './builder/BuilderSection';
import AppSection from './app/AppSection';
import RouteSection from './route/RouteSection';
import ScalingSection from './scaling/ScalingSection';

export interface GitImportFormProps {
  builderImages?: NormalizedBuilderImages;
}

const GitImportForm: React.FC<FormikProps<FormikValues> & GitImportFormProps> = ({
  values,
  errors,
  handleSubmit,
  handleReset,
  builderImages,
  status,
  isSubmitting,
  dirty,
}) => (
  <Form onReset={handleReset} onSubmit={handleSubmit}>
    <div className="co-m-pane__form">
      <GitSection />
      <AppSection project={values.project} />
      <BuilderSection image={values.image} builderImages={builderImages} />
      <ExpandCollapse>
        <RouteSection />
        <ScalingSection />
      </ExpandCollapse>
    </div>
    <br />
    <ButtonBar errorMessage={status && status.submitError} inProgress={isSubmitting}>
      <Button disabled={!dirty || !_.isEmpty(errors)} type="submit" bsStyle="primary">
        Create
      </Button>
      <Button type="reset">Cancel</Button>
    </ButtonBar>
  </Form>
);

export default GitImportForm;
