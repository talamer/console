/* eslint-disable no-undef, dot-notation */
import * as React from 'react';
import * as _ from 'lodash-es';
import { Formik } from 'formik';
import { GitImportProps, GitImportFormData } from './import-types';
import { NormalizedBuilderImages, normalizeBuilderImages } from '../../utils/imagestream-utils';
import {
  createDeploymentConfig,
  createImageStream,
  createBuildConfig,
  createService,
  createRoute,
} from './import-submit-utils';
import { history } from '../../../../components/utils';
import {
  validateGitUrl,
  validateName,
  validateBuilderImage,
  validateApplication,
} from './import-validation-utils';
import GitImportForm from './GitImportForm';

const GitImport: React.FC<GitImportProps> = ({ activeNamespace, imageStreams }) => {
  const initialValues: GitImportFormData = {
    name: '',
    project: {
      name: activeNamespace || '',
    },
    application: {
      name: '',
      selectedKey: '',
    },
    git: {
      url: '',
      type: '',
      ref: '',
      dir: '',
    },
    image: {
      selected: '',
      recommended: '',
      tag: '',
      ports: [],
    },
    visibility: {
      gitType: false,
    },
  };

  const builderImages: NormalizedBuilderImages =
    imageStreams && imageStreams.loaded && normalizeBuilderImages(imageStreams.data);

  const handleSubmit = (values, actions) => {
    event.preventDefault();
    const imageStream = builderImages[values.image.selected].obj;

    const {
      project: { name: namespace },
      createRoute: canCreateRoute = false,
      ports,
    } = values;

    const requests = [
      createDeploymentConfig(values, imageStream),
      createImageStream(values, imageStream),
      createBuildConfig(values, imageStream),
    ];

    // Only create a service or route if the builder image has ports.
    if (!_.isEmpty(ports)) {
      requests.push(createService(values, imageStream));
      if (canCreateRoute) {
        requests.push(createRoute(values, imageStream));
      }
    }

    requests.forEach((r) => r.catch((err) => actions.setStatus({ submitError: err.message })));
    Promise.all(requests)
      .then(() => {
        actions.setSubmitting(false);
        history.push(`/dev/topology/ns/${namespace}`);
      })
      .catch((err) => {
        actions.setSubmitting(false);
        actions.setStatus({ submitError: err.message });
      });
  };

  const validate = (values: GitImportFormData) => {
    const errors = {
      name: validateName(values.name),
      git: validateGitUrl(values.git, values.visibility),
      image: validateBuilderImage(values.image),
      application: validateApplication(values.application),
    };

    return _.pickBy(errors);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onReset={history.goBack}
      validate={validate}
      render={(props) => <GitImportForm {...props} builderImages={builderImages} />}
    />
  );
};

export default GitImport;
