/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { Dropdown, ResourceName } from '../../../../components/utils';
import { FormGroup, ControlLabel } from 'patternfly-react';
import ImageStreamInfo from '../source-to-image/ImageStreamInfo';

export interface BuilderImageTagSelectorProps {
  imageTags: any[];
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

  const imageTag = _.find(imageTags, { name: selectedImageTag });
  const displayName = _.get(
    imageTag,
    ['annotations', 'openshift.io/display-name'],
    selectedImageDisplayName,
  );

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
      {selectedImageTag && (
        <FormGroup className="co-m-pane__form">
          <ImageStreamInfo displayName={displayName} tag={imageTag} />
        </FormGroup>
      )}
    </React.Fragment>
  );
};

export default BuilderImageTagSelector;
