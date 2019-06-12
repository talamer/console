/* eslint-disable no-undef, dot-notation */
import * as React from 'react';
import * as _ from 'lodash-es';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { NumberSpinner } from '../../../../../components/utils';

interface ScalingProps {
  replicas?: number;
  replicaError?: string;
  onChange: (replicas: number) => void;
}

export const isPositiveInteger = (replicas: number) => {
  return _.isInteger(replicas) && replicas >= 0
    ? ''
    : 'Replicas must be an integer value greater than or equal to 0.';
};

const Scaling: React.FC<ScalingProps> = ({ replicas, replicaError, onChange }) => {
  const onChangeData: React.ReactEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.valueAsNumber);
  };

  return (
    <React.Fragment>
      <div className="co-section-heading">Scaling</div>
      <div className="co-section-heading-tertiary">
        Replicas are scaled manually based on CPU usage.
      </div>
      <FormGroup controlId="scaling-replicas" className={replicaError ? 'has-error' : ''}>
        <ControlLabel>Replicas</ControlLabel>
        <NumberSpinner
          id="scaling-replicas"
          className="form-control"
          value={replicas}
          onChange={onChangeData}
          changeValueBy={(operation: number) => onChange(_.toInteger(replicas) + operation)}
        />
        <HelpBlock>The number of instances of your image.</HelpBlock>
        <HelpBlock>{replicaError}</HelpBlock>
      </FormGroup>
    </React.Fragment>
  );
};

export default Scaling;
