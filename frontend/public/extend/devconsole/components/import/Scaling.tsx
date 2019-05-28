import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import { Dropdown } from '../../../../components/utils/index';
import './Scaling.scss';

/* changeData(event) {
      this.setState({
        [event.target.name]: event.target.value,
      } as BasicAuthSubformState, () => this.props.onChange(this.state));
    } */

interface ScalingProps {
  autoScaleType: string;
  replicas?: string;
  onChange: (autoScaleType: string, replicas?: string) => void;
}
export default class autoScaleType extends React.PureComponent<ScalingProps> {
  autoScaleOptions = {
    Manual: 'Manual',
    Automatic: 'Automatic',
  };

  onScaleChange = (key) => {
    this.props.onChange(key);
  };

  onChangeData: React.ReactEventHandler<HTMLInputElement> = (event) => {
    this.props.onChange(this.props.autoScaleType, event.currentTarget.value);
  };

  isInteger = () => {
    if (this.props.replicas !== '0' && Number(this.props.replicas) === 0) return false;
    return Number.isInteger(Number(this.props.replicas));
  };

  autoScaleFields = () => {
    return this.props.autoScaleType === this.autoScaleOptions.Automatic ? (
      <React.Fragment>
        <FormGroup className="">
          <ControlLabel>Min Pods</ControlLabel>
          <FormControl
            id="min-pods"
            type="number"
            name="minPods"
            // onChange={this.changeData}
            // value={this.state.username}
          />
          <HelpBlock>
            The lower limit for the number of pods that can be set by the autoscaler. If not
            specified, defaults to 1.
          </HelpBlock>
        </FormGroup>
        <FormGroup className="">
          <ControlLabel>Max Pods</ControlLabel>
          <FormControl
            id="max-pods"
            type="number"
            name="maxPods"
            // onChange={this.changeData}
            // value={this.state.username}
          />
          <HelpBlock>
            The upper limit for the number of pods that can be set by the autoscaler.
          </HelpBlock>
        </FormGroup>
        <FormGroup className="">
          <ControlLabel>CPU Request Target</ControlLabel>
          <FormControl
            id="cpu-request-target"
            type="number"
            name="cpuRequestTarget"
            // onChange={this.changeData}
            // value={this.state.username}
          />
          <HelpBlock>
            The percentage of the CPU request that each pod should ideally be using. Pods will be
            added or removed periodically when CPU usage exceeds or drops below this target value.
          </HelpBlock>
          <span className="warning-text">
            You should configure resource limits below for autoscaling. Autoscaling will not work
            without a CPU request.
          </span>
        </FormGroup>
      </React.Fragment>
    ) : (
      <FormGroup className={this.isInteger() ? '' : 'has-error'}>
        <ControlLabel>Replicas</ControlLabel>
        <FormControl
          id="replicas"
          type="number"
          className="odc-replicas"
          name="replicas"
          onChange={this.onChangeData}
          value={this.props.replicas}
          min={0}
        />
        <HelpBlock>The number of instances of your image.</HelpBlock>
        {!this.isInteger() && (
          <HelpBlock>Replicas must be an integer value greater than or equal to 0.</HelpBlock>
        )}
      </FormGroup>
    );
  };
  render() {
    const { autoScaleType } = this.props;
    return (
      <React.Fragment>
        <FormGroup>
          <h3>Scaling</h3>
          <ControlLabel>Strategy</ControlLabel>
          <Dropdown
            dropDownClassName="dropdown--full-width"
            items={this.autoScaleOptions}
            selectedKey={autoScaleType || 'Manual'}
            title={this.autoScaleOptions.Manual}
            onChange={this.onScaleChange}
          />
          <HelpBlock>Scale replicas manually or automatically based on CPU usage. </HelpBlock>
          {this.props.autoScaleType === this.autoScaleOptions.Automatic && (
            <span className="warning-text">
              CPU metrics might not be available. In order to use horizontal pod autoscalers, your
              cluster administrator must have properly configured cluster metrics.
            </span>
          )}
        </FormGroup>
        {this.autoScaleFields()}
      </React.Fragment>
    );
  }
}
