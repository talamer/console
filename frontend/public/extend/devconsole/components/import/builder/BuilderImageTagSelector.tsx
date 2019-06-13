/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { useFormikContext, FormikValues } from 'formik';
import { ResourceName } from '../../../../../components/utils';
import { getTagDataWithDisplayName, BuilderImage } from '../../../utils/imagestream-utils';
import { DropdownField } from '../../formik-fields';
import { K8sResourceKind, k8sGet } from '../../../../../module/k8s';
import { getPorts } from '../../../../../components/source-to-image';
import { ImageStreamTagModel } from '../../../../../models';
import ImageStreamInfo from '../../source-to-image/ImageStreamInfo';

export interface BuilderImageTagSelectorProps {
  selectedBuilderImage: BuilderImage;
  selectedImageTag: string;
}

const BuilderImageTagSelector: React.FC<BuilderImageTagSelectorProps> = ({
  selectedBuilderImage,
  selectedImageTag,
}) => {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const {
    name: imageName,
    tags: imageTags,
    displayName: imageDisplayName,
    imageStreamNamespace,
  } = selectedBuilderImage;

  const tagItems = {};
  _.each(
    imageTags,
    ({ name }) => (tagItems[name] = <ResourceName kind="ImageStreamTag" name={name} />),
  );

  const [imageTag, displayName] = getTagDataWithDisplayName(
    imageTags,
    selectedImageTag,
    imageDisplayName,
  );

  React.useEffect(() => {
    k8sGet(ImageStreamTagModel, `${imageName}:${selectedImageTag}`, imageStreamNamespace).then(
      (imageStreamTag: K8sResourceKind) => {
        const ports = getPorts(imageStreamTag);
        setFieldValue('image.ports', ports);
      },
    );
  }, [selectedImageTag]);

  return (
    <React.Fragment>
      <DropdownField
        name="image.tag"
        label="Builder Image Version"
        items={tagItems}
        selectedKey={selectedImageTag}
        title={tagItems[selectedImageTag]}
        fullWidth
        required
      />
      {imageTag && <ImageStreamInfo displayName={displayName} tag={imageTag} />}
    </React.Fragment>
  );
};

export default BuilderImageTagSelector;
