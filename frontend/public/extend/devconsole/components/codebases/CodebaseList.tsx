import * as React from 'react';
import { ComponentDetails } from './CodebaseDetails'
import { ColHead, DetailsPage, List, ListHeader, ListPage, ResourceRow } from '../../../../components/factory';
import { Kebab, navFactory, ResourceLink } from '../../../../components/utils';

const menuActions = [Kebab.factory.ModifyPodSelector, ...Kebab.factory.common];

const ComponentHeader = props => <ListHeader>
  <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="metadata.name">Name</ColHead>
  <ColHead {...props} className="col-lg-2 col-md-2 col-sm-4 hidden-xs" sortField="metadata.namespace">Namespace</ColHead>
  <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortField="spec.buildtype">BuildType</ColHead>
  <ColHead {...props} className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="spec.codebase">Codebase</ColHead>
  <ColHead {...props} className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortField="spec.listenport">Port</ColHead>
</ListHeader>;

const ComponentRow = ({obj: s}) => <ResourceRow obj={s}>
  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 co-text-service">
    <ResourceLink kind="Component" name={s.metadata.name} title={s.metadata.name}/> 
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



const {details, pods, editYaml} = navFactory;
const ComponentDetailsPage = props => <DetailsPage
  {...props}
  menuActions={menuActions}
  pages={[details(ComponentDetails), editYaml(), pods()]}
/>;

const ComponentList = props => <List {...props} Header={ComponentHeader} Row={ComponentRow} />;
const ComponentPage = props => <ListPage canCreate={false} ListComponent={ComponentList} {...props} />;

export {ComponentList, ComponentPage, ComponentDetailsPage};
