/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { LoadingInline } from '../../../../../components/utils';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { CheckCircleIcon, StarIcon } from '@patternfly/react-icons';
import { NormalizedBuilderImages } from '../../../utils/imagestream-utils';
import BuilderImageCard from './BuilderImageCard';
import { useField, useFormikContext, FormikValues } from 'formik';
import cx from 'classnames';
import './BuilderImageSelector.scss';

export interface BuilderImageSelectorProps {
  loadingImageStream: boolean;
  loadingRecommendedImage?: boolean;
  builderImages: NormalizedBuilderImages;
}

const BuilderImageSelector: React.FC<BuilderImageSelectorProps> = ({
  loadingImageStream,
  loadingRecommendedImage,
  builderImages,
}) => {
  const [selected, { error: selectedError, touched: selectedTouched }] = useField('image.selected');
  const [recommended] = useField('image.recommended');
  const { setFieldValue } = useFormikContext<FormikValues>();

  const handleImageChange = (image: string) => {
    setFieldValue('image.selected', image);
    setFieldValue('image.tag', builderImages[image].recentTag.name);
  };

  return (
    <FormGroup controlId="builder-image-selector-field" className={cx({ 'has-error': selectedError })}>
      <ControlLabel className="co-required">Builder Image</ControlLabel>
      {loadingRecommendedImage && <LoadingInline />}
      {recommended.value && (
        <React.Fragment>
          <CheckCircleIcon className="odc-builder-image-selector__success-icon" />
          <HelpBlock>
            Recommended builder images are represented by{' '}
            <StarIcon style={{ color: 'var(--pf-global--success-color--100)' }} /> icon
          </HelpBlock>
        </React.Fragment>
      )}
      {loadingImageStream ? (
        <LoadingInline />
      ) : (
        <div id={"builder-image-selector-field"} className="odc-builder-image-selector">
          {_.values(builderImages).map((image) => (
            <BuilderImageCard
              key={`${image.name}-key`}
              image={image}
              selected={selected.value === image.name}
              recommended={recommended.value === image.name}
              onChange={handleImageChange}
            />
          ))}
        </div>
      )}
      {selectedTouched && selectedError && <HelpBlock>{selectedError}</HelpBlock>}
    </FormGroup>
  );
};

export default BuilderImageSelector;
