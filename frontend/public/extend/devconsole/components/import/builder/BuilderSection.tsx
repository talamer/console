/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { SectionHeading } from '../../../../../components/utils';
import BuilderImageSelector from './BuilderImageSelector';
import { NormalizedBuilderImages } from '../../../utils/imagestream-utils';
import { ImageData } from '../import-types';
import BuilderImageTagSelector from './BuilderImageTagSelector';

export interface ImageSectionProps {
  image: ImageData;
  builderImages: NormalizedBuilderImages;
}

const BuilderSection: React.FC<ImageSectionProps> = ({ image, builderImages }) => {
  return (
    <React.Fragment>
      <SectionHeading text="Builder" style={{ fontWeight: '500' }} />
      <BuilderImageSelector
        loadingImageStream={!builderImages}
        builderImages={builderImages}
        data-test-id="builder-image-selector"
      />
      {image.tag && (
        <BuilderImageTagSelector
          imageTags={builderImages[image.selected].tags}
          selectedImageTag={image.tag}
          selectedImageDisplayName={builderImages[image.selected].displayName}
        />
      )}
    </React.Fragment>
  );
};

export default BuilderSection;
