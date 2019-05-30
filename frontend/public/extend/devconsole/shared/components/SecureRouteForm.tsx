import * as React from 'react';
import { FormGroup, ControlLabel, HelpBlock, CheckBox } from 'patternfly-react';
import { AsyncComponent, Dropdown } from '../../../../components/utils';

const DroppableFileInput = (props) => (
  <AsyncComponent
    loader={() =>
      import('../../../../components/utils/file-input').then((c) => c.DroppableFileInput)
    }
    {...props}
  />
);

interface SecureRouteFormProps {
  termination?: string;
  certificate?: string;
  privateKey?: string;
  caCertificate?: string;
  destinationCACertificate?: string;
  terminationTypes?: {};
  passthroughInsecureTrafficTypes?: {};
  insecureTrafficTypes?: {};
  secure?: boolean;
  createRoute?: boolean;
  createRouteOption?: boolean;
  onInsecureTrafficChange?: (selectedKey: string) => void;
  onCertificateChange?: (selectedKey: string) => void;
  onCaCertificateChange?: (selectedKey: string) => void;
  onDestinationCACertificateChange?: (selectedKey: string) => void;
  onPrivateKeyChange?: (selectedKey: string) => void;
  onSecureRouteChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onTerminationChange?: (selectedKey: string) => void;
}

const SecureRouteForm: React.FC<SecureRouteFormProps> = (props: SecureRouteFormProps) => {
  const {
    termination,
    certificate,
    privateKey,
    caCertificate,
    destinationCACertificate,
    terminationTypes,
    onTerminationChange,
    passthroughInsecureTrafficTypes,
    insecureTrafficTypes,
    onInsecureTrafficChange,
    onCertificateChange,
    onCaCertificateChange,
    onDestinationCACertificateChange,
    onPrivateKeyChange,
    onSecureRouteChange,
    secure,
    createRoute,
    createRouteOption,
  } = props;
  return (
    <FormGroup>
      {(!createRouteOption || createRoute) && (
        <React.Fragment>
          <ControlLabel>Security</ControlLabel>
          <FormGroup controlId="secure" className="checkbox">
            <CheckBox
              onChange={onSecureRouteChange}
              checked={secure}
              name="secure"
              aria-describedby="secure-help"
            >
              Secure route
            </CheckBox>
            <HelpBlock id="secure-help">
              Routes can be secured using several TLS termination types for serving certificates.
            </HelpBlock>
          </FormGroup>
        </React.Fragment>
      )}
      {secure && (
        <div className="co-create-route__security">
          <FormGroup controlId="tls-termination">
            <ControlLabel className="co-required">TLS Termination</ControlLabel>
            <Dropdown
              items={terminationTypes}
              title="Select termination type"
              dropDownClassName="dropdown--full-width"
              onChange={onTerminationChange}
            />
          </FormGroup>
          <FormGroup
            controlId="insecure-traffic"
            className="form-group co-create-route__insecure-traffic"
          >
            <ControlLabel>Insecure Traffic</ControlLabel>
            <Dropdown
              items={
                termination === 'passthrough'
                  ? passthroughInsecureTrafficTypes
                  : insecureTrafficTypes
              }
              title="Select insecure traffic type"
              dropDownClassName="dropdown--full-width"
              onChange={onInsecureTrafficChange}
              describedBy="insecure-traffic-help"
            />
            <HelpBlock id="insecure-traffic-help">
              Policy for traffic on insecure schemes like HTTP.
            </HelpBlock>
          </FormGroup>
          {termination &&
            termination !== 'passthrough' && (
            <React.Fragment>
              <h3>Certificates</h3>
              <HelpBlock>
                  TLS certificates for edge and re-encrypt termination. If not specified, the
                  router's default certificate is used.
              </HelpBlock>
              <FormGroup controlId="certificate">
                <DroppableFileInput
                  onChange={onCertificateChange}
                  inputFileData={certificate}
                  label="Certificate"
                  inputFieldHelpText="The PEM format certificate. Upload file by dragging &amp; dropping, selecting it, or pasting from the clipboard."
                />
              </FormGroup>
              <FormGroup>
                <DroppableFileInput
                  onChange={onPrivateKeyChange}
                  inputFileData={privateKey}
                  id="private-key"
                  label="Private Key"
                  inputFieldHelpText="The PEM format key. Upload file by dragging &amp; dropping, selecting it, or pasting from the clipboard."
                />
              </FormGroup>
              <FormGroup controlId="ca-certificate">
                <DroppableFileInput
                  onChange={onCaCertificateChange}
                  inputFileData={caCertificate}
                  label="CA Certificate"
                  inputFieldHelpText="The PEM format CA certificate chain. Upload file by dragging &amp; dropping, selecting it, or pasting from the clipboard."
                />
              </FormGroup>
              {termination === 'reencrypt' && (
                <FormGroup controlId="destination-ca-certificate">
                  <DroppableFileInput
                    onChange={onDestinationCACertificateChange}
                    inputFileData={destinationCACertificate}
                    label="Destination CA Certificate"
                    inputFieldHelpText="The PEM format CA certificate chain to validate the endpoint certificate for re-encrypt termination. Upload file by dragging &amp; dropping, selecting it, or pasting from the clipboard."
                  />
                </FormGroup>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </FormGroup>
  );
};

export default SecureRouteForm;
