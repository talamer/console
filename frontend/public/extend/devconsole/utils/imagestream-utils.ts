/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import { ContainerPort, K8sResourceKind } from '../../../module/k8s';
import {
  isBuilder,
  getMostRecentBuilderTag,
  getBuilderTagsSortedByVersion,
} from '../../../components/image-stream';
import {
  getImageStreamIcon,
  getImageForIconClass,
} from '../../../components/catalog/catalog-item-icon';

export interface BuilderImage {
  obj: K8sResourceKind;
  name: string;
  displayName: string;
  title: string;
  iconUrl: string;
  tags: any[];
  recentTag: any;
}

export interface NormalizedBuilderImages {
  [builderImageName: string]: BuilderImage;
}

export const getSampleRepo = (tag) => _.get(tag, 'annotations.sampleRepo');
export const getSampleRef = (tag) => _.get(tag, 'annotations.sampleRef');
export const getSampleContextDir = (tag) => _.get(tag, 'annotations.sampleContextDir');

// Transform image ports to k8s structure.
// `{ '3306/tcp': {} }` -> `{ containerPort: 3306, protocol: 'TCP' }`
const portsFromSpec = (portSpec: object): ContainerPort[] => {
  return _.reduce(
    portSpec,
    (result: ContainerPort[], value, key) => {
      const parts = key.split('/');
      if (parts.length === 1) {
        parts.push('tcp');
      }

      const containerPort = parseInt(parts[0], 10);
      if (_.isFinite(containerPort)) {
        result.push({
          containerPort,
          protocol: parts[1].toUpperCase(),
        });
      } else {
        // eslint-disable-next-line no-console
        console.warn('Unrecognized image port format', key);
      }

      return result;
    },
    [],
  );
};

export const getPorts = (imageStreamImage: object): ContainerPort[] => {
  const portSpec =
    _.get(imageStreamImage, 'image.dockerImageMetadata.Config.ExposedPorts') ||
    _.get(imageStreamImage, 'image.dockerImageMetadata.ContainerConfig.ExposedPorts');
  return portsFromSpec(portSpec);
};

// Use the same naming convention as the CLI.
export const makePortName = (port: ContainerPort): string =>
  `${port.containerPort}-${port.protocol}`.toLowerCase();

export const prettifyName = (name: string) => {
  return name.replace(/(-|^)([^-]?)/g, (first, prep, letter) => {
    return (prep && ' ') + letter.toUpperCase();
  });
};

export const normalizeBuilderImages = (
  imageStreams: K8sResourceKind[],
): NormalizedBuilderImages => {
  const builderImageStreams = imageStreams.filter((imageStream) => isBuilder(imageStream));
  const builderImages = {};
  builderImageStreams.map((imageStream) => {
    const tags = getBuilderTagsSortedByVersion(imageStream);
    const recentTag = getMostRecentBuilderTag(imageStream);
    const name = imageStream.metadata.name;
    const displayName = _.get(imageStream, [
      'metadata',
      'annotations',
      'openshift.io/display-name',
    ]);
    const title = displayName && displayName.length < 14 ? displayName : prettifyName(name);
    const iconClass = getImageStreamIcon(recentTag);
    const iconUrl = getImageForIconClass(iconClass);

    builderImages[name] = {
      obj: imageStream,
      name,
      displayName,
      title,
      iconUrl,
      tags,
      recentTag,
    };
  });

  return builderImages;
};
