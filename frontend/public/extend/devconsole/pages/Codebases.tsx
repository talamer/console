import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CodeBaseList } from '../components/codebases/codebaselist';
import { ColHead, ListHeader } from '../../../components/factory';


class CodebasesPage extends React.Component<codebaseProps,codebaseState> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(PrevProps){
    this.updateList();
  }
  state ={
    displayList:[],
  }
  updateList(){
    this.state.displayList = [ { name:'apple' }, { name:'mango' }];
  }
  render() {
    const { namespace } = this.props;  
    const ns = namespace?namespace:'all projects';
    const headingTitle = "View Codebases in " + ns;

    return(
      <React.Fragment>
      <Helmet>
        <title>Codebases</title>
      </Helmet>
      <div className="codeBaseContainer">
        <h2 className="codeBaseMainTitle"> {headingTitle} </h2>
        <div className="codeBaseHeader">
          <ListHeader>
            <ColHead className="col-lg-3 col-md-3 col-sm-4 col-xs-6" sortField="metadata.name">Codebase</ColHead>
            <ColHead className="col-lg-2 col-md-3 col-sm-4 col-xs-6" sortField="metadata.namespace">Namespace</ColHead>
            <ColHead className="col-lg-3 col-md-3 col-sm-4 hidden-xs" sortField="metadata.labels">Description</ColHead>
            <ColHead className="col-lg-2 col-md-3 hidden-sm hidden-xs" sortField="spec.selector">Type</ColHead>
            <ColHead className="col-lg-2 hidden-md hidden-sm hidden-xs" sortField="spec.clusterIP">Location</ColHead>
          </ListHeader>
          <CodeBaseList list={this.state.displayList}></CodeBaseList>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default CodebasesPage;
type codebaseProps = {
  namespace: string;
};
type codebaseState = {
  displayList: Array<Object>;
};


