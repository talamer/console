import * as React from 'react';
import CodebaseDetails from './CodebaseDetails'
import CodebaseHeader from './CodebaseHeader'
import CodebaseRow from './CodebaseRow'
import { DetailsPage, List, ListPage } from '../../../../components/factory';
import { Kebab, navFactory } from '../../../../components/utils';

const menuActions = [Kebab.factory.ModifyPodSelector, ...Kebab.factory.common];


const {details, pods, editYaml} = navFactory;
const CodebaseDetailsPage = props => <DetailsPage
  {...props}
  menuActions={menuActions}
  namespace = {props.namespace} 
  pages={[details(CodebaseDetails), editYaml(), pods()]}
/>;

const CodebaseList = props => <List {...props} Header={CodebaseHeader} Row={CodebaseRow} />;
const CodebasePage = props => <ListPage canCreate={false} ListComponent={CodebaseList} {...props} />;

export {CodebaseList, CodebasePage, CodebaseDetailsPage};
