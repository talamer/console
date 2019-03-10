import * as React from 'react';
import { SectionHeading, ResourceSummary } from '../../../../components/utils';

const CodebaseDetails = ({obj: s}) => <div className="co-m-pane__body">
  <div className="row">
    <div className="col-sm-6">
      <SectionHeading text="Component Overview" />
      <ResourceSummary resource={s} showNodeSelector={false}>
        <dt>Build Type</dt>
        <dd>{s.spec.buildtype || '-'}</dd>
      </ResourceSummary>
    </div>
    <div className="col-sm-6">
      <SectionHeading text="Component Source" />
      <dl>
        <dt>Git Source URL</dt>
        <dd className="co-text-pods">
          <p><a href={s.spec.codebase} target="blank" >{s.spec.codebase}</a> <i className='fa fa-external-link' /></p>
        </dd>
        <dt>Listen Port</dt>
        <dd className="co-text-pods">
          {s.spec.listenport ? s.spec.listenport : '-'}
        </dd>
      </dl>
    </div>
  </div>
</div>;

export default CodebaseDetails;