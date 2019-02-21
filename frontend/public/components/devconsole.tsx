import * as React from 'react';
import { FLAGS, connectToFlags, flagPending } from '../features';
import { LoadingBox } from './utils/status-box';
import { Redirect } from 'react-router-dom';

const GettingStartedPage_: React.SFC<GettingStartedPageProps> = props => {
  if (!props.flags[FLAGS.SHOW_DEV_CONSOLE]) {
    return <Redirect to='/' />;
  }
  if (flagPending(props.flags[FLAGS.SHOW_DEV_CONSOLE])) {
    return <LoadingBox />;
  }
  return <div>
    <div className="co-well">
      <h4>DevOps console Getting Started</h4>
      <p>
      DevOpsconsole is an internal feature and enabled only in development.
      See our documention for instructions on how to enable the devconsole.
      </p>
      <p>
        DevOpsconsole is an alpha feature.
      </p>
    </div>
  </div>;
};

export type GettingStartedPageProps = {
    filterLabel: string,
    flags: {[_: string]: boolean},
    match: {url: string},
};

export const GettingsStartedPage = connectToFlags(FLAGS.SHOW_DEV_CONSOLE)(GettingStartedPage_);
