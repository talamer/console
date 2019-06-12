/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { FormControl, FormGroup, ControlLabel, HelpBlock, CheckBox } from 'patternfly-react';
import { Dropdown } from '../../../../components/utils';
import { K8sResourceKind } from '../../../../module/k8s';

interface CreateRouteFormProps {
  name?: string;
  hostname?: string;
  path?: string;
  loadedServices?: boolean;
  serviceOptions?: { [key: string]: React.ReactNode };
  portOptions?: { [key: string]: React.ReactNode };
  service?: K8sResourceKind;
  targetPort?: string;
  createRoute?: boolean;
  createRouteOption?: boolean;
  hostnameErrorMsg?: string;
  pathErrorMsg?: string;
  onInputChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onServiceChange?: (selectedKey: string) => void;
  onTargetPortChange?: (selectedKey: string) => void;
  onCreateRouteChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

const CreateRouteForm: React.FC<CreateRouteFormProps> = (props: CreateRouteFormProps) => {
  const {
    onInputChange,
    name,
    hostname,
    path,
    loadedServices,
    serviceOptions,
    portOptions,
    service,
    targetPort,
    onTargetPortChange,
    createRouteOption,
    onServiceChange,
    createRoute,
    onCreateRouteChange,
    hostnameErrorMsg,
    pathErrorMsg,
  } = props;

  return (
    <React.Fragment>
      {createRouteOption && (
        <React.Fragment>
          <h2>Routing</h2>
          <FormGroup className="checkbox">
            <CheckBox
              onChange={onCreateRouteChange}
              checked={createRoute}
              id="createRoute"
              name="createRoute"
            >
              Create a route to the application
            </CheckBox>
          </FormGroup>
        </React.Fragment>
      )}
      {(!createRouteOption || createRoute) && (
        <FormGroup>
          <div className="co-m-pane__form">
            {name !== undefined && (
              <FormGroup controlId="name">
                <ControlLabel className="co-required">Name</ControlLabel>
                <FormControl
                  type="text"
                  onChange={onInputChange}
                  value={name}
                  placeholder="my-route"
                  name="name"
                  aria-describedby="name-help"
                  required
                />
                <HelpBlock id="name-help">
                  Public hostname for the route. If not specified, a hostname is generated.
                </HelpBlock>
              </FormGroup>
            )}
            {hostname !== undefined && (
              <FormGroup controlId="hostname">
                <ControlLabel>Hostname</ControlLabel>
                <FormControl
                  type="text"
                  onChange={onInputChange}
                  value={hostname}
                  placeholder="www.example.com"
                  name="hostname"
                  aria-describedby="hostname-help"
                />
                <HelpBlock id="hostname-help">
                  Public hostname for the route. If not specified, a hostname is generated.
                </HelpBlock>
                {hostnameErrorMsg && (
                  <div className="has-error">
                    <HelpBlock>{hostnameErrorMsg}</HelpBlock>
                  </div>
                )}
              </FormGroup>
            )}
            {path !== undefined && (
              <FormGroup controlId="path">
                <ControlLabel>Path</ControlLabel>
                <FormControl
                  type="text"
                  onChange={onInputChange}
                  value={path}
                  placeholder="/"
                  name="path"
                  aria-describedby="path-help"
                />
                <HelpBlock id="path-help">
                  Path that the router watches to route traffic to the service.
                </HelpBlock>
                {pathErrorMsg && (
                  <div className="has-error">
                    <HelpBlock>{pathErrorMsg}</HelpBlock>
                  </div>
                )}
              </FormGroup>
            )}
            {loadedServices && (
              <FormGroup controlId="service">
                <ControlLabel className="co-required">Service</ControlLabel>
                {_.isEmpty(serviceOptions) && (
                  <p className="alert alert-info co-create-route__alert">
                    <span className="pficon pficon-info" aria-hidden="true" /> There are no services
                    in your project to expose with a route.
                  </p>
                )}
                {!_.isEmpty(serviceOptions) && (
                  <Dropdown
                    items={serviceOptions}
                    title={service ? serviceOptions[service.metadata.name] : 'Select a service'}
                    dropDownClassName="dropdown--full-width"
                    onChange={onServiceChange}
                    describedBy="service-help"
                  />
                )}
                <HelpBlock id="service-help">Service to route to.</HelpBlock>
              </FormGroup>
            )}
            {targetPort !== undefined && (
              <FormGroup contolId="target-port">
                <ControlLabel className="co-required">Target Port</ControlLabel>
                {_.isEmpty(portOptions) && <p>Select a service above</p>}
                {!_.isEmpty(portOptions) && (
                  <Dropdown
                    items={portOptions}
                    title={portOptions[targetPort] || 'Select target port'}
                    dropDownClassName="dropdown--full-width"
                    onChange={onTargetPortChange}
                    describedBy="target-port-help"
                  />
                )}
                <HelpBlock id="target-port-help">Target port for traffic.</HelpBlock>
              </FormGroup>
            )}
          </div>
        </FormGroup>
      )}
    </React.Fragment>
  );
};

export default CreateRouteForm;
