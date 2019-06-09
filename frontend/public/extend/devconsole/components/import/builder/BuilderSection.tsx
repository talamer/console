/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { NormalizedBuilderImages } from '../../../utils/imagestream-utils';
import { ImageData } from '../import-types';
import { FormSection } from '../section/FormSection';
import BuilderImageSelector from './BuilderImageSelector';
import BuilderImageTagSelector from './BuilderImageTagSelector';

export interface ImageSectionProps {
  image: ImageData;
  builderImages: NormalizedBuilderImages;
}

const BuilderSection: React.FC<ImageSectionProps> = ({ image, builderImages }) => {
  return (
    <FormSection title="Builder">
      <BuilderImageSelector loadingImageStream={!builderImages} builderImages={builderImages} />
      {image.tag && (
        <BuilderImageTagSelector
          imageTags={builderImages[image.selected].tags}
          selectedImageTag={image.tag}
          selectedImageDisplayName={builderImages[image.selected].displayName}
        />
      )}
    </FormSection>
  );
};

export default BuilderSection;
