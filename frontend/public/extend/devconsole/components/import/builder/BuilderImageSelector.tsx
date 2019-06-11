/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { useField, useFormikContext, FormikValues } from 'formik';
import { LoadingInline } from '../../../../../components/utils';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { CheckCircleIcon, StarIcon } from '@patternfly/react-icons';
import { NormalizedBuilderImages, getPorts } from '../../../utils/imagestream-utils';
import { getValidationState } from '../../formik-fields/field-utils';
import { K8sResourceKind, k8sGet } from '../../../../../module/k8s';
import { ImageStreamTagModel } from '../../../../../models';
import BuilderImageCard from './BuilderImageCard';
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
  const { values, setValues, setFieldValue, setFieldTouched, validateForm } = useFormikContext<
    FormikValues
  >();

  const handleImageChange = async (image: string) => {
    const recentTag = builderImages[image].recentTag.name;
    const imageStreamNamespace = builderImages[image].imageStreamNamespace;
    const newValues = {
      ...values,
      image: {
        ...values.image,
        selected: image,
        tag: recentTag,
      },
    };
    setValues(newValues);
    await k8sGet(ImageStreamTagModel, `${image}:${recentTag}`, imageStreamNamespace).then(
      (imageStreamTag: K8sResourceKind) => {
        const ports = getPorts(imageStreamTag);
        setFieldValue('image.ports', ports);
      },
    );
    setFieldTouched('image.selected', true);
    setFieldTouched('image.tag', true);
    validateForm(newValues);
  };

  return (
    <FormGroup
      controlId="builder-image-selector-field"
      validationState={getValidationState(selectedError, selectedTouched)}
    >
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
        <div id="builder-image-selector-field" className="odc-builder-image-selector">
          {_.values(builderImages).map((image) => (
            <BuilderImageCard
              key={image.name}
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
