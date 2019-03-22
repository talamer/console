// import * as _ from 'lodash-es';
import * as React from 'react';
import { ModelessOverlay, Modal, ExpandCollapse } from 'patternfly-react';
import { CatalogItemHeader } from 'patternfly-react-extensions';
import { ImportFlowCatalog } from './import-flow-catalog';
import { Button } from '@patternfly/react-core'
import { builderImages } from './mock.data';

export class ImportFlow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      codeBase: null,
      nameSpace: 'myproject',
      show: false ,
    };
  }

  // Close modal window
  toggleOverlay = (event) => this.setState({show: !this.state.show});

  render() {
    return (
      <div>
      <Button
        type="button"
        onClick={this.toggleOverlay}
      >Toggle modal</Button>
      <ModelessOverlay
        show={this.state.show}
        bsSize={'lg'}
      >
        <Modal.Header>
          <Modal.CloseButton onClick={this.toggleOverlay} />
          <CatalogItemHeader
            title={'Import from Git'}
            vendor={''}
            iconClass={'x'}
            />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <div className="modal-body-inner-shadow-covers">
              <div className="form-group">
                <label htmlFor="name">Name </label>
                <input
                  className="form-control"
                  type="text" id="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gitUrl">Git URL</label>
                <input
                  className="form-control"
                  type="text"
                  id="gitUrl"
                />
              </div>
              <div className="form-group">
                <h1 className="catalog-item-header-pf-title">Authorize</h1>
                <div className="import__auth">
                  Authorize us to clone your repo
                  <br/>
                  <Button>Authorize</Button>
                </div>
              </div>
              <div className="form-group">
                <h1 className="catalog-item-header-pf-title">Select builder image to use</h1>
              </div>
                <ImportFlowCatalog sourceImages={builderImages} />
              <br/>
              <div className="form-group import__option">
                  <ExpandCollapse />
              </div>
            </div>
          </div>
        </Modal.Body>
      </ModelessOverlay>
      </div>
    )
  }
}