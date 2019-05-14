/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as classNames from 'classnames';
import { Card, CardHeader, CardBody } from '@patternfly/react-core';
import { BuilderImage } from '../../utils/imagestream-utils';
import './BuilderImageCard.scss';

export interface BuilderImageCardProps {
  image: BuilderImage;
  selected: boolean;
  recommended: boolean;
  onChange: (name: string) => void;
}

const BuilderImageCard: React.FC<BuilderImageCardProps> = ({
  image,
  selected,
  recommended,
  onChange,
}) => {
  const classes = classNames('odc-builder-image-card', { 'is-selected': selected });
  return (
    <Card className={classes} onClick={() => onChange(image.name)}>
      <CardHeader>
        <img className="odc-builder-image-card__icon" src={image.iconUrl} alt={image.displayName} />
      </CardHeader>
      <CardBody>
        <span className="odc-builder-image-card__title">{image.title}</span>
      </CardBody>
      {recommended && (
        <span className="odc-builder-image-card__recommended">
          <i className="fa fa-star" aria-hidden="true" />
        </span>
      )}
    </Card>
  );
};

export default BuilderImageCard;
