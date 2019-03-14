import * as React from 'react';
import CodebaseHeader from './CodebaseHeader'
import CodebaseRow from './CodebaseRow'
import { List } from '../../../../components/factory';

const CodebaseList = props => <List {...props} Header={CodebaseHeader} Row={CodebaseRow} />;

export default CodebaseList;
