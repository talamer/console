/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Card, CardHeader, CardBody } from '@patternfly/react-core';
import { OkIcon } from '@patternfly/react-icons';
import './BuilderImageCard.scss';

const BuilderImageCard = ({ image, selected, recommended, onChange }) => {
  return (
    <Card
      className={`odc-builder-image-selector__card ${
        selected ? 'odc-builder-image-selector__card-selected' : ''
      }`}
      onClick={() => onChange(image.name)}
    >
      <CardHeader>
        <img
          className="odc-builder-image-selector__card-icon"
          src={image.iconUrl}
          alt={image.displayName}
        />
      </CardHeader>
      <CardBody>
        <span className="odc-builder-image-selector__card-title">{image.title}</span>
      </CardBody>
      {recommended && (
        <span className="odc-builder-image-selector__card-recommended">
          <OkIcon />
        </span>
      )}
    </Card>
  );
};

export default BuilderImageCard;
