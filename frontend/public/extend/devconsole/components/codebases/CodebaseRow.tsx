import * as React from 'react';
import { ResourceRow } from '../../../../components/factory';
import { ResourceLink } from '../../../../components/utils';

const CodebaseRow = ({obj: s}) => <ResourceRow obj={s}>
  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 co-text-service">
    <ResourceLink kind="Component" name={s.metadata.name} namespace={s.metadata.namespace} title={s.metadata.name}/> 
  </div>
  <div className="col-lg-2 col-md-2 col-sm-4 hidden-xs">
    <ResourceLink kind="Namespace" name={s.metadata.namespace} title={s.metadata.namespace} />
  </div>
  <div className="col-lg-2 col-md-2 hidden-sm hidden-xs co-text-service">
    <p>{s.spec.buildtype}</p>
  </div>
  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 co-text-pods">
    <p><a href={s.spec.codebase} target="blank" >{s.spec.codebase}</a> <i className='fa fa-external-link' /></p>
  </div>
  <div className="col-lg-2 col-md-2 hidden-sm hidden-xs co-text-service">
    <p>{s.spec.listenport}</p>
  </div>
</ResourceRow>;

export default CodebaseRow;