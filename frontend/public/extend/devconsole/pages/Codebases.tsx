import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CodeBaseList } from '../components/codebases/codebaselist';
import { ColHead, ListHeader } from '../../../components/factory';


class CodebasesPage extends React.Component<codebaseProps,codebaseState> {
  constructor(props) {
    super(props);
    this.updateList();
  }
  mockList = [{ name:'Christian', namespace:"kube-dns", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' }, 
              { name:'Nimisha', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Joshua', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Steve', namespace:"kube-dns", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Adi', namespace:"kube-proxy", description: "lorem ipsum lorem lorem ipsum lorem ipsumipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Dholiak', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Rohit', namespace:"myproject", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Sahil', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Vikram', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Divyanshi', namespace:"myproject", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Karthik', namespace:"openshift", description: "lorem ipsum lorem ipsum llorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum orem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Debsmita', namespace:"openshift", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Baiju', namespace:"openshift", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Ibrahim', namespace:"openshift", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Harpreet', namespace:"kube-dns", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum  lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Serena', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Shoubhik', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Saravana', namespace:"myproject", description: "lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsumipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Anji', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum  ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Vidhya', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
              { name:'Karuna', namespace:"kube-proxy", description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum", location:'https://www.redhat.com' },
            ];
  state ={
    displayList:[],
  }
  namespace = this.props.namespace;  
  ns = this.namespace?this.namespace:'all projects';
  headingTitle = "View Codebases in " + this.ns;
  updateList(){
    if(this.ns == 'all projects'){
      this.state.displayList = this.mockList;
    }
    else{
      this.state.displayList = this.mockList.filter(item => item.namespace == this.ns);
    }
  }
  render() {


    return(
      <React.Fragment>
      <Helmet>
        <title>Codebases</title>
      </Helmet>
      <div className="codeBaseContainer">
        <h2 className="codeBaseMainTitle"> {this.headingTitle} </h2>
        <div className="codeBaseHeader">
          <ListHeader>
            <ColHead className="col-lg-2 col-md-2 col-sm-4 col-xs-6" sortField="metadata.name">Codebase</ColHead>
            <ColHead className="col-lg-2 col-md-2 col-sm-4 col-xs-6" sortField="metadata.namespace">Namespace</ColHead>
            <ColHead className="col-lg-5 col-md-5 col-sm-4 hidden-xs" sortField="metadata.labels">Description</ColHead>
            <ColHead className="col-lg-3 col-md-3 hidden-sm hidden-xs" sortField="spec.selector">Location</ColHead>
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


