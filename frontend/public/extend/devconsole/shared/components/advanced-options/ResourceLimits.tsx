/* eslint-disable no-undef, dot-notation */
import * as React from 'react';
import * as _ from 'lodash-es';
import { FormGroup, ControlLabel, HelpBlock } from 'patternfly-react';
import {
  NumberSpinner,
  Dropdown,
  units,
  convertToBaseValue,
} from '../../../../../components/utils';

interface ResourceLimitProps {
  cpuRequest?: {
    [key: string]: string | number;
  };
  cpuLimit?: {
    [key: string]: string | number;
  };
  memoryRequest?: {
    [key: string]: string | number;
  };
  memoryLimit?: {
    [key: string]: string | number;
  };
  cpuRequestError?: string;
  cpuLimitError?: string;
  memoryRequestError?: string;
  memoryLimitError?: string;
  onCpuRequestChange?: (cpuRequest?: { [key: string]: string | number }) => void;
  onCpuLimitChange?: (cpuLimit?: { [key: string]: string | number }) => void;
  onMemoryRequestChange?: (memoryRequest?: { [key: string]: string | number }) => void;
  onMemoryLimitChange?: (memoryLimit?: { [key: string]: string | number }) => void;
}

export const isPositive = (value: number) => {
  return value >= 0 ? '' : 'Can\'t be negative.';
};

export const convertValueToBase = (value: number, unitLabel: string) => {
  let val: number;
  switch (unitLabel) {
    case 'millicores':
      val = convertToBaseValue(`${value} m`);
      break;
    case 'MiB':
      val = units.dehumanize(`${value}MiB`, 'binaryBytes').value;
      break;
    case 'GiB':
      val = units.dehumanize(`${value}GiB`, 'binaryBytes').value;
      break;
    case 'MB':
      val = units.dehumanize(`${value}MB`, 'decimalBytes').value;
      break;
    case 'GB':
      val = units.dehumanize(`${value}GB`, 'decimalBytes').value;
      break;
    default:
      val = value;
      break;
  }
  return val;
};

export const validateLimit = (min: number, max: number, unitOfMin: string, unitOfMax: string) => {
  if (isPositive(max)) {
    return isPositive(max);
  }
  const minInBase = convertValueToBase(min, unitOfMin);
  const maxInBase = convertValueToBase(max, unitOfMax);
  if (maxInBase < minInBase) {
    return `Limit can't be less than request (${min} ${unitOfMin}).`;
  }
};

const ResourceLimits: React.FC<ResourceLimitProps> = ({
  cpuRequest,
  cpuLimit,
  memoryRequest,
  memoryLimit,
  cpuRequestError,
  cpuLimitError,
  memoryRequestError,
  memoryLimitError,
  onCpuRequestChange,
  onCpuLimitChange,
  onMemoryRequestChange,
  onMemoryLimitChange,
}) => {
  const cpuUnits: { [key: string]: string } = {
    millicores: 'millicores',
    cores: 'cores',
  };

  const memoryUnits: { [key: string]: string } = {
    MiB: 'MiB',
    GiB: 'GiB',
    MB: 'MB',
    GB: 'GB',
  };

  const defaultUnit: { [key: string]: string } = {
    cpu: cpuUnits.millicores,
    memory: memoryUnits.MiB,
  };

  const binaryUnitLabel = 'MiB';
  const decimalUnitLabel = 'MB';

  const onChangeCpuRequestData: React.ReactEventHandler<HTMLInputElement> = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value === '' ? 0 : event.currentTarget.valueAsNumber;
    onCpuRequestChange({
      [event.currentTarget.name]: val,
      ['requestUnit']: cpuRequest.requestUnit || defaultUnit.cpu,
    });
  };

  const onChangeCpuLimitData: React.ReactEventHandler<HTMLInputElement> = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value === '' ? 0 : event.currentTarget.valueAsNumber;
    onCpuLimitChange({
      [event.currentTarget.name]: val,
      ['limitUnit']: cpuLimit.limitUnit || defaultUnit.cpu,
    });
  };

  const onChangeMemoryRequestData: React.ReactEventHandler<HTMLInputElement> = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value === '' ? 0 : event.currentTarget.valueAsNumber;
    onMemoryRequestChange({
      [event.currentTarget.name]: val,
      ['requestUnit']: memoryRequest.requestUnit || defaultUnit.memory,
    });
  };

  const onChangeMemoryLimitData: React.ReactEventHandler<HTMLInputElement> = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value === '' ? 0 : event.currentTarget.valueAsNumber;
    onMemoryLimitChange({
      [event.currentTarget.name]: val,
      ['limitUnit']: memoryLimit.limitUnit || defaultUnit.memory,
    });
  };

  const onChangeCpuRequest = (operation : number) => {
    onCpuRequestChange({
      ['request']: _.toInteger(cpuRequest.request) + operation,
      ['requestUnit']: cpuRequest.requestUnit || defaultUnit.cpu,
    });
  };

  const onCpuRequestUnitChange = (val: string) => {
    onCpuRequestChange({
      ['request']: cpuRequest.request,
      ['requestUnit']: cpuUnits[val],
    });
  };

  const onChangeCpuLimit = (operation: number) => {
    onCpuLimitChange({
      ['limit']: _.toInteger(cpuLimit.limit) + operation,
      ['limitUnit']: cpuLimit.limitUnit || defaultUnit.cpu,
    });
  };

  const onCpuLimitUnitChange = (val: string) => {
    onCpuLimitChange({
      ['limit']: cpuLimit.limit,
      ['limitUnit']: cpuUnits[val],
    });
  };

  const onChangeMemoryRequest = (operation: number) => {
    onMemoryRequestChange({
      ['request']: _.toInteger(memoryRequest.request) + operation,
      ['requestUnit']: memoryRequest.requestUnit || defaultUnit.memory,
    });
  };

  const onMemoryRequestUnitChange = (val: string) => {
    onMemoryRequestChange({
      ['request']: memoryRequest.request,
      ['requestUnit']: memoryUnits[val],
    });
  };

  const onChangeMemoryLimit = (operation: number) => {
    onMemoryLimitChange({
      ['limit']: _.toInteger(memoryLimit.limit) + operation,
      ['limitUnit']: memoryLimit.limitUnit || defaultUnit.memory,
    });
  };

  const onMemoryLimitUnitChange = (val: string) => {
    onMemoryLimitChange({
      ['limit']: memoryLimit.limit,
      ['limitUnit']: memoryUnits[val],
    });
  };

  return (
    <React.Fragment>
      <div className="co-section-heading">Resource Limits</div>
      <div className="co-section-heading-tertiary">CPU</div>
      <FormGroup controlId="cpu-request" className={cpuRequestError && 'has-error'}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-xs-7 col-sm-6">
            <ControlLabel>Request</ControlLabel>
            <NumberSpinner
              id="cpu-request"
              name="request"
              className="form-control"
              value={cpuRequest.request}
              onChange={onChangeCpuRequestData}
              changeValueBy={onChangeCpuRequest}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-xs-5 col-sm-6">
            <ControlLabel>Unit</ControlLabel>
            <Dropdown
              items={cpuUnits}
              selectedKey={cpuUnits.millicores}
              title={cpuUnits.millicores}
              onChange={onCpuRequestUnitChange}
            />
          </div>
        </div>
        <HelpBlock>The minimum amount of CPU the container is guaranteed.</HelpBlock>
        {cpuRequestError && <HelpBlock>{cpuRequestError}</HelpBlock>}
      </FormGroup>
      <FormGroup controlId="cpu-limit" className={cpuLimitError && 'has-error'}>
        <div className="row">
          <div  className="col-lg-4 col-md-4 col-xs-7 col-sm-6">
            <ControlLabel>Limit</ControlLabel>
            <NumberSpinner
              id="cpu-limit"
              name="limit"
              className="form-control"
              value={cpuLimit.limit}
              onChange={onChangeCpuLimitData}
              changeValueBy={onChangeCpuLimit}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-xs-5 col-sm-6">
            <ControlLabel>Unit</ControlLabel>
            <Dropdown
              items={cpuUnits}
              selectedKey={cpuUnits.millicores}
              title={cpuUnits.millicores}
              onChange={onCpuLimitUnitChange}
            />
          </div>
        </div>
        <HelpBlock>
          The maximum amount of CPU the container is allowed to use when running.
        </HelpBlock>
        {cpuLimitError && <HelpBlock>{cpuLimitError}</HelpBlock>}
      </FormGroup>
      <div className="co-section-heading-tertiary">Memory</div>
      <FormGroup controlId="memory-request" className={memoryRequestError && 'has-error'}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-xs-7 col-sm-6">
            <ControlLabel>Request</ControlLabel>
            <NumberSpinner
              id="memory-request"
              name="request"
              className="form-control"
              value={memoryRequest.request}
              onChange={onChangeMemoryRequestData}
              changeValueBy={onChangeMemoryRequest}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-xs-5 col-sm-6">
            <ControlLabel>Unit</ControlLabel>
            <Dropdown
              items={memoryUnits}
              selectedKey={memoryUnits.MiB}
              title={memoryUnits.MiB}
              spacerBefore={new Set([decimalUnitLabel])}
              headerBefore={{
                [binaryUnitLabel]: 'Binary Units',
                [decimalUnitLabel]: 'Decimal Units',
              }}
              onChange={onMemoryRequestUnitChange}
            />
          </div>
        </div>
        <HelpBlock>The minimum amount of Memory the container is guaranteed.</HelpBlock>
        {memoryRequestError && <HelpBlock>{memoryRequestError}</HelpBlock>}
      </FormGroup>
      <FormGroup controlId="memory-limit" className={memoryLimitError && 'has-error'}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-xs-7 col-sm-6">
            <ControlLabel>Limit</ControlLabel>
            <NumberSpinner
              id="memory-limit"
              name="limit"
              className="form-control"
              value={memoryLimit.limit}
              onChange={onChangeMemoryLimitData}
              changeValueBy={onChangeMemoryLimit}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-xs-5 col-sm-6">
            <ControlLabel>Unit</ControlLabel>
            <Dropdown
              items={memoryUnits}
              selectedKey={memoryUnits.MiB}
              title={memoryUnits.MiB}
              spacerBefore={new Set([decimalUnitLabel])}
              headerBefore={{
                [binaryUnitLabel]: 'Binary Units',
                [decimalUnitLabel]: 'Decimal Units',
              }}
              onChange={onMemoryLimitUnitChange}
            />
          </div>
        </div>
        <HelpBlock>
          The maximum amount of Memory the container is allowed to use when running.
        </HelpBlock>
        {memoryLimitError && <HelpBlock>{memoryLimitError}</HelpBlock>}
      </FormGroup>
    </React.Fragment>
  );
};

export default ResourceLimits;
