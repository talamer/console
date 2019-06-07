import * as React from 'react';
import { Form, Button } from 'patternfly-react';
import { FormikProps, FormikValues } from 'formik';
import { GitImportFormProps } from './import-types';
import { SectionDivider } from './SectionDivider';
import { ButtonBar } from '../../../../components/utils';
import GitSection from './git/GitSection';
import BuilderSection from './builder/BuilderSection';
import AppSection from './app/AppSection';

const GitImportForm: React.FC<FormikProps<FormikValues> & GitImportFormProps> = ({
  values,
  errors,
  handleSubmit,
  handleReset,
  builderImages,
  status,
  isSubmitting,
}) => {
  console.log('errors', errors);
  return (
    <Form onReset={handleReset} onSubmit={handleSubmit} className="co-m-pane__body-group">
      <div className="co-m-pane__form">
        <GitSection />
        <SectionDivider />
        <AppSection project={values.project} />
        <SectionDivider />
        <BuilderSection image={values.image} builderImages={builderImages} />
      </div>
      <ButtonBar
        className="co-source-to-image-form__button-bar"
        errorMessage={status && status.submitError}
        inProgress={isSubmitting}
      >
        <Button type="submit" bsStyle="primary">
          Create
        </Button>
        <Button type="reset">Cancel</Button>
      </ButtonBar>
    </Form>
  );
};

export default GitImportForm;
