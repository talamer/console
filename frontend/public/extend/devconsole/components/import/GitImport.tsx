/* eslint-disable no-unused-vars, no-undef, dot-notation */
import * as React from 'react';
import { Formik } from 'formik';
import { GitImportFormData, FirehoseList } from './import-types';
import { NormalizedBuilderImages, normalizeBuilderImages } from '../../utils/imagestream-utils';
import { createResources } from './import-submit-utils';
import { history } from '../../../../components/utils';
import { validationSchema } from './import-validation-utils';
import GitImportForm from './GitImportForm';
import { K8sResourceKind } from '../../../../module/k8s';

export interface GitImportProps {
  namespace: string;
  imageStreams?: FirehoseList;
}

const GitImport: React.FC<GitImportProps> = ({ namespace, imageStreams }) => {
  const initialValues: GitImportFormData = {
    name: '',
    project: {
      name: namespace || '',
    },
    application: {
      name: '',
      selectedKey: '',
    },
    git: {
      url: '',
      type: '',
      ref: '',
      dir: '/',
      showGitType: false,
    },
    image: {
      selected: '',
      recommended: '',
      tag: '',
      ports: [],
    },
    route: {
      create: true,
    },
    build: {
      env: [],
      triggers: {
        webhook: true,
        image: true,
        config: true,
      },
    },
    deployment: {
      env: [],
      triggers: {
        image: true,
        config: true,
      },
      replicas: 1,
    },
    labels: {},
  };

  const builderImages: NormalizedBuilderImages =
    imageStreams && imageStreams.loaded && normalizeBuilderImages(imageStreams.data);

  const handleSubmit = (values, actions) => {
    const imageStream = builderImages[values.image.selected].obj;

    const { project: { name: namespace } } = values;

    const dryRunRequests: Promise<K8sResourceKind>[] = createResources(values, imageStream, {
      queryParams: { dryRun: 'All' },
    });

    Promise.all(dryRunRequests)
      .then(() => {
        const requests: Promise<K8sResourceKind>[] = createResources(values, imageStream);
        return Promise.all(requests);
      })
      .then(() => {
        actions.setSubmitting(false);
        history.push(`/dev/topology/ns/${namespace}`);
      })
      .catch((err) => {
        actions.setSubmitting(false);
        actions.setStatus({ submitError: err.message });
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onReset={history.goBack}
      validationSchema={validationSchema}
      render={(props) => <GitImportForm {...props} builderImages={builderImages} />}
    />
  );
};

export default GitImport;
