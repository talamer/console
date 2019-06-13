/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import {
  ImageStreamModel,
  BuildConfigModel,
  DeploymentConfigModel,
  ServiceModel,
  RouteModel,
} from '../../../../models';
import { k8sCreate, K8sResourceKind } from '../../../../module/k8s';
import { makePortName } from '../../utils/imagestream-utils';
import { getAppLabels, getPodLabels } from '../../utils/resource-label-utils';
import { GitImportFormData } from './import-types';

export const createImageStream = (
  formData: GitImportFormData,
  { metadata: { name: imageStreamName } }: K8sResourceKind,
): Promise<K8sResourceKind> => {
  const {
    name,
    project: { name: namespace },
    application: { name: application },
  } = formData;
  const labels = getAppLabels(name, application, imageStreamName);
  const imageStream = {
    apiVersion: 'image.openshift.io/v1',
    kind: 'ImageStream',
    metadata: {
      name,
      namespace,
      labels,
    },
  };

  return k8sCreate(ImageStreamModel, imageStream);
};

export const createBuildConfig = (
  formData: GitImportFormData,
  imageStream: K8sResourceKind,
): Promise<K8sResourceKind> => {
  const {
    name,
    project: { name: namespace },
    application: { name: application },
    git: { url: repository, ref = 'master', dir: contextDir },
    image: { tag: selectedTag },
    build: { env, triggers },
  } = formData;

  const labels = getAppLabels(name, application, imageStream.metadata.name);
  const buildConfig = {
    apiVersion: 'build.openshift.io/v1',
    kind: 'BuildConfig',
    metadata: {
      name,
      namespace,
      labels,
    },
    spec: {
      output: {
        to: {
          kind: 'ImageStreamTag',
          name: `${name}:latest`,
        },
      },
      source: {
        contextDir,
        git: {
          uri: repository,
          ref,
          type: 'Git',
        },
      },
      strategy: {
        type: 'Source',
        sourceStrategy: {
          env,
          from: {
            kind: 'ImageStreamTag',
            name: `${imageStream.metadata.name}:${selectedTag}`,
            namespace: imageStream.metadata.namespace,
          },
        },
      },
      triggers: [
        ...(triggers.image ? [{ type: 'ImageChange', imageChange: {} }] : []),
        ...(triggers.config ? [{ type: 'ConfigChange' }] : []),
      ],
    },
  };

  return k8sCreate(BuildConfigModel, buildConfig);
};

export const createDeploymentConfig = (
  formData: GitImportFormData,
  imageStream: K8sResourceKind,
): Promise<K8sResourceKind> => {
  const {
    name,
    project: { name: namespace },
    application: { name: application },
    image: { ports },
    deployment: { env, replicas, triggers },
  } = formData;

  const labels = getAppLabels(name, application, imageStream.metadata.name);
  const podLabels = getPodLabels(name);

  const deploymentConfig = {
    apiVersion: 'apps.openshift.io/v1',
    kind: 'DeploymentConfig',
    metadata: {
      name,
      namespace,
      labels,
    },
    spec: {
      selector: podLabels,
      replicas,
      template: {
        metadata: {
          labels: podLabels,
        },
        spec: {
          containers: [
            {
              name,
              image: `${name}:latest`,
              ports,
              env,
            },
          ],
        },
      },
      triggers: [
        {
          type: 'ImageChange',
          imageChangeParams: {
            automatic: triggers.image,
            containerNames: [name],
            from: {
              kind: 'ImageStreamTag',
              name: `${name}:latest`,
            },
          },
        },
        ...(triggers.config ? [{ type: 'ConfigChange' }] : []),
      ],
    },
  };

  return k8sCreate(DeploymentConfigModel, deploymentConfig);
};

export const createService = (
  formData: GitImportFormData,
  imageStream: K8sResourceKind,
): Promise<K8sResourceKind> => {
  const {
    name,
    project: { name: namespace },
    application: { name: application },
    image: { ports },
  } = formData;

  const firstPort = _.head(ports);
  const labels = getAppLabels(name, application, imageStream.metadata.name);
  const podLabels = getPodLabels(name);
  const service = {
    kind: 'Service',
    apiVersion: 'v1',
    metadata: {
      name,
      namespace,
      labels,
    },
    spec: {
      selector: podLabels,
      ports: [
        {
          port: firstPort.containerPort,
          targetPort: firstPort.containerPort,
          protocol: firstPort.protocol,
          // Use the same naming convention as the CLI.
          name: makePortName(firstPort),
        },
      ],
    },
  };

  return k8sCreate(ServiceModel, service);
};

export const createRoute = (
  formData: GitImportFormData,
  imageStream: K8sResourceKind,
): Promise<K8sResourceKind> => {
  const {
    name,
    project: { name: namespace },
    application: { name: application },
    image: { ports },
  } = formData;

  const firstPort = _.head(ports);
  const labels = getAppLabels(name, application, imageStream.metadata.name);
  const route = {
    kind: 'Route',
    apiVersion: 'route.openshift.io/v1',
    metadata: {
      name,
      namespace,
      labels,
    },
    spec: {
      to: {
        kind: 'Service',
        name,
      },
      // The service created by `createService` uses the same port as the container port.
      port: {
        // Use the port name, not the number for targetPort. The router looks
        // at endpoints, not services, when resolving ports, so port numbers
        // will not resolve correctly if the service port and container port
        // numbers don't match.
        targetPort: makePortName(firstPort),
      },
      wildcardPolicy: 'None',
    },
  };

  return k8sCreate(RouteModel, route);
};
