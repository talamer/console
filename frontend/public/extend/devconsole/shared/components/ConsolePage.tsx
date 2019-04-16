/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './ConsolePage.scss';

export interface ConsolePageProps {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  megaMenu?: React.ReactNode;
}

const ConsolePage: React.FunctionComponent<ConsolePageProps> = (props: ConsolePageProps) => {
  return (
    <div className="pf-c-page">
      {props.header}
      <main role="main" className="pf-c-page__main">
        <div className="odc-console-page">
          <div style={{ display: 'flex' }}>{props.sidebar}</div>
          <div className="odc-console-page__section">{props.children}</div>
          {props.megaMenu}
        </div>
      </main>
    </div>
  );
};

export default ConsolePage;
