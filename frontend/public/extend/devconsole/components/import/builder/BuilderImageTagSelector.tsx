/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { ResourceName } from '../../../../../components/utils';
import { FormGroup } from 'patternfly-react';
import ImageStreamInfo from '../../source-to-image/ImageStreamInfo';
import { ImageTag, getTagDataWithDisplayName } from '../../../utils/imagestream-utils';
import { DropdownField } from '../../formik-fields';

export interface BuilderImageTagSelectorProps {
  imageTags: ImageTag[];
  selectedImageTag: string;
  selectedImageDisplayName: string;
}

const BuilderImageTagSelector: React.FC<BuilderImageTagSelectorProps> = ({
  imageTags,
  selectedImageTag,
  selectedImageDisplayName,
}) => {
  const tagItems = {};
  _.each(
    imageTags,
    ({ name }) => (tagItems[name] = <ResourceName kind="ImageStreamTag" name={name} />),
  );

  const [imageTag, displayName] = getTagDataWithDisplayName(
    imageTags,
    selectedImageTag,
    selectedImageDisplayName,
  );

  return (
    <React.Fragment>
      <FormGroup>
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
      </FormGroup>
    </React.Fragment>
  );
};

export default BuilderImageTagSelector;
