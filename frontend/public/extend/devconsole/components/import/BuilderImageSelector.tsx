/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { LoadingInline } from '../../../../components/utils';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { CheckCircleIcon, StarIcon } from '@patternfly/react-icons';
import { NormalizedBuilderImages } from '../../utils/imagestream-utils';
import BuilderImageCard from './BuilderImageCard';
import './BuilderImageSelector.scss';

export interface BuilderImageSelectorProps {
  loadingImageStream: boolean;
  loadingRecommendedImage: boolean;
  builderImages: NormalizedBuilderImages;
  builderImageError: string;
  selectedImage: string;
  recommendedImage: string;
  onImageChange: (selectedImage: string) => void;
}

const BuilderImageSelector: React.FC<BuilderImageSelectorProps> = ({
  loadingImageStream,
  loadingRecommendedImage,
  builderImages,
  selectedImage,
  recommendedImage,
  builderImageError,
  onImageChange,
}) => (
  <FormGroup controlId="import-builder-image" className={builderImageError ? 'has-error' : ''}>
    <ControlLabel className="co-required">Builder Image</ControlLabel>
    {loadingRecommendedImage && <LoadingInline />}
    {recommendedImage && (
      <React.Fragment>
        <CheckCircleIcon className="odc-import-form__success-icon" />
        <HelpBlock>
          Recommended builder images are represented by{' '}
          <StarIcon style={{ color: 'var(--pf-global--success-color--100)' }} /> icon
        </HelpBlock>
      </React.Fragment>
    )}
    {loadingImageStream ? (
      <LoadingInline />
    ) : (
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
    )}
    <HelpBlock>{builderImageError}</HelpBlock>
  </FormGroup>
);

export default BuilderImageSelector;
