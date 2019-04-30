/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { K8sResourceKind } from '../../../../module/k8s';
import { getAnnotationTags } from '../../../../components/image-stream';
import { ImageStreamIcon } from '../../../../components/catalog/catalog-item-icon';
import { ExternalLink } from '../../../../components/utils';
import SourceToImageResourceDetails from './SourceToImageResourceDetails';
import { getSampleRepo } from '../../utils/imagestream-utils';

export type ImageStreamInfoProps = {
  imageStream: K8sResourceKind;
  tag: object;
};

const ImageStreamInfo: React.FC<ImageStreamInfoProps> = ({ imageStream, tag }) => {
  const displayName = _.get(
    tag,
    ['annotations', 'openshift.io/display-name'],
    imageStream.metadata.name,
  );
  const annotationTags = getAnnotationTags(tag);
  const description = _.get(tag, 'annotations.description');
  const sampleRepo = getSampleRepo(tag);

  return (
    <div className="co-catalog-item-info">
      <div className="co-catalog-item-details">
        <ImageStreamIcon tag={tag} iconSize="large" />
        <div>
          <h2 className="co-section-heading co-catalog-item-details__name">{displayName}</h2>
          {annotationTags && (
            <p className="co-catalog-item-details__tags">
              {_.map(annotationTags, (annotationTag, i) => (
                <span className="co-catalog-item-details__tag" key={i}>
                  {annotationTag}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      {description && <p className="co-catalog-item-details__description">{description}</p>}
      {sampleRepo && (
        <p>
          Sample repository: <ExternalLink href={sampleRepo} text={sampleRepo} />
        </p>
      )}
      <SourceToImageResourceDetails />
    </div>
  );
};

export default ImageStreamInfo;
