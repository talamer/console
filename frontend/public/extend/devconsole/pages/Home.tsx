import { Redirect } from 'react-router-dom';
import * as React from 'react';
import { FLAGS, connectToFlags, flagPending } from '../../../features';
import { LoadingBox } from '../../../components/utils/status-box';


const HomePage: React.SFC<HomePageProps> = props => {
  if (!props.flags[FLAGS.SHOW_DEV_CONSOLE]) {
    return <Redirect to='/' />;
  }
  if (flagPending(props.flags[FLAGS.SHOW_DEV_CONSOLE])) {
    return <LoadingBox />;
  }
  return (
    <div className="co-well">
      <h4>DevOps console Getting Started</h4>
      <p>
      DevOps console is an internal feature and enabled only in development.
      See our documention for instructions on how to enable the devconsole.
      </p>
      <p>
        DevOpsconsole is an alpha feature.
      </p>
    </div>
  )
};

export type HomePageProps = {
    flags: {[_: string]: boolean},
};

export default connectToFlags(FLAGS.SHOW_DEV_CONSOLE)(HomePage);
