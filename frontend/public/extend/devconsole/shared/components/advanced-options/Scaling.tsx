import * as React from 'react';
import * as _ from 'lodash-es';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import './Scaling.scss';
import { NumberSpinner } from '../../../../../components/utils';

interface ScalingProps {
  replicas: number;
  onChange: (replicas: number) => void;
}

export default class Scaling extends React.PureComponent<ScalingProps> {
  onChangeData: React.ReactEventHandler<HTMLInputElement> = (event) => {
    this.props.onChange(event.currentTarget.valueAsNumber);
  };

  changeValueBy = (operation) => {
    this.props.onChange(_.toInteger(this.props.replicas) + operation);
  };

  isPositiveInteger = () => {
    return _.isInteger(this.props.replicas) && this.props.replicas >= 0;
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="odc-scaling">Scaling</h2>
        <h4 className="odc-scaling-info">Replicas are scaled manually based on CPU usage. </h4>
        <FormGroup className={this.isPositiveInteger() ? '' : 'has-error'}>
          <ControlLabel>Replicas</ControlLabel>
          <NumberSpinner
            className="form-control"
            value={this.props.replicas}
            onChange={this.onChangeData}
            changeValueBy={this.changeValueBy}
          />
          <HelpBlock>The number of instances of your image.</HelpBlock>
          {!this.isPositiveInteger() && (
            <HelpBlock>Replicas must be an integer value greater than or equal to 0.</HelpBlock>
          )}
        </FormGroup>
      </React.Fragment>
    );
  }
}
