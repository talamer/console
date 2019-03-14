import * as React from 'react';
import CodebaseList from './CodebaseList'
import { ListPage } from '../../../../components/factory';

const CodebasePage = props => <ListPage canCreate={false} ListComponent={CodebaseList} {...props} />;

export default CodebasePage
