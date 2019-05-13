/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { LoadingInline } from '../../../../components/utils';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { NormalizedBuilderImages } from '../../utils/imagestream-utils';
import BuilderImageCard from './BuilderImageCard';
import './BuilderImageSelector.scss';

export interface BuilderImageSelectorProps {
  builderImages: NormalizedBuilderImages;
  isBuilderImageDetected: boolean;
  gitUrlValidationStatus: string;
  builderImageError: string;
  selectedImage: string;
  recommendedImage: string;
  onImageChange: (selectedImage: string) => void;
}

const BuilderImageSelector: React.FC<BuilderImageSelectorProps> = ({
  builderImages,
  selectedImage,
  recommendedImage,
  isBuilderImageDetected,
  gitUrlValidationStatus,
  builderImageError,
  onImageChange,
}) => {
  if (!builderImages) {
    return <LoadingInline />;
  }

  let showDetectBuildToolStatus;
  if (gitUrlValidationStatus === 'ok' && !recommendedImage && !builderImageError) {
    showDetectBuildToolStatus = (
      <span className="odc-import-form__loader">
        <LoadingInline />
      </span>
    );
  } else if (isBuilderImageDetected) {
    showDetectBuildToolStatus = <CheckCircleIcon className="odc-import-form__success-icon" />;
  }

  return (
    <FormGroup controlId="import-builder-image" className={builderImageError ? 'has-error' : ''}>
      <ControlLabel className="co-required">Builder Image</ControlLabel>
      {showDetectBuildToolStatus}
      <div className="odc-builder-image-selector">
        {_.values(builderImages).map((image) => (
          <BuilderImageCard
            key={`${image.name}-key`}
            image={image}
            selected={selectedImage === image.name}
            recommended={recommendedImage === image.name}
            onChange={onImageChange}
          />
        ))}
      </div>
      <HelpBlock>{builderImageError ? builderImageError : ''}</HelpBlock>
    </FormGroup>
  );
};

export default BuilderImageSelector;
