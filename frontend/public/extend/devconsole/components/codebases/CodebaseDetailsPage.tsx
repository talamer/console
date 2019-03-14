import * as React from 'react';
import CodebaseDetails from './CodebaseDetails'
import { navFactory } from '../../../../components/utils';
import { DetailsPage} from '../../../../components/factory';

const {details, pods, editYaml} = navFactory;
const CodebaseDetailsPage = props => <DetailsPage
  {...props}
  pages={[details(CodebaseDetails), editYaml(), pods()]}
/>;

export default CodebaseDetailsPage;
