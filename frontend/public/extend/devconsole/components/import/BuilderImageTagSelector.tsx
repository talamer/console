/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { Dropdown, ResourceName } from '../../../../components/utils';
import { FormGroup, ControlLabel } from 'patternfly-react';
import ImageStreamInfo from '../source-to-image/ImageStreamInfo';
import { ImageTag, getTagDataWithDisplayName } from '../../utils/imagestream-utils';

export interface BuilderImageTagSelectorProps {
  imageTags: ImageTag[];
  selectedImageTag: string;
  selectedImageDisplayName: string;
  onTagChange: (selectedTag: string) => void;
}

const BuilderImageTagSelector: React.FC<BuilderImageTagSelectorProps> = ({
  imageTags,
  selectedImageTag,
  selectedImageDisplayName,
  onTagChange,
}) => {
  const tagItems = {};
  _.each(
    imageTags,
    ({ name }) => (tagItems[name] = <ResourceName kind="ImageStreamTag" name={name} />),
  );

  const [imageTag, displayName] = getTagDataWithDisplayName(imageTags, selectedImageTag, selectedImageDisplayName);

  return (
    <React.Fragment>
      <FormGroup className="co-m-pane__form">
        <ControlLabel className="co-required">Builder Image Version</ControlLabel>
        <Dropdown
          items={tagItems}
          selectedKey={selectedImageTag}
          title={tagItems[selectedImageTag]}
          onChange={onTagChange}
          dropDownClassName="dropdown--full-width"
        />
      </FormGroup>
      {imageTag && (
        <FormGroup className="co-m-pane__form">
          <ImageStreamInfo displayName={displayName} tag={imageTag} />
        </FormGroup>
      )}
    </React.Fragment>
  );
};

export default BuilderImageTagSelector;
