import * as React from 'react';
import { ResourceIcon } from '../../../../components/utils';
import { ColHead, ListHeader } from '../../../../components/factory';

export class CodeBaseList extends React.Component<codebaseListProps> {
  constructor(props) {
    super(props);
    console.log(this.display);
  }

  componentWillMount(){
    if( this.props.namespace ) {
      this.updateDisplay( this.props.list, this.props.namespace);
    }
    else
      this.updateDisplay( this.props.list, 'all projects');
  }

  componentWillReceiveProps(NextProps){
    if( NextProps.namespace!= this.props.namespace ) {
      if( NextProps.namespace )
        this.updateDisplay(NextProps.list, NextProps.namespace);
      else
        this.updateDisplay(NextProps.list, 'all projects');
    }
  }

  display = <h3 className = 'noCodebasesFound'> No codebases found. </h3>; 

  updateDisplay = (dataList, namespace) => {
    if( namespace != 'all projects' )
     var list = dataList.filter( item => item.namespace == namespace );
    else
     var list = dataList;

    console.log("List Updatedisplay", list, namespace);
    if(list && list.length == 0){
        this.display = <h3 className = 'noCodebasesFound co-text-service'> No codebases found. </h3>;
    }
    else{ 
        this.display = list.map((item,key)=>{
            return ( 
                <div className="co-ip-row" key={key}>
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-3 col-xs-4 co-text-service">
                    <p>{item.name || '-'}</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-3 col-xs-4 co-text-service">
                    <p className="co-text-node"><ResourceIcon kind="Node" />
                      <span>
                        { namespace == 'all projects' ? item.namespace : namespace }
                      </span>
                    </p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-3 col-xs-4 co-text-service">
                    <p>{item.buildType}</p>
                  </div>
                  <div className="col-lg-4 col-md-4 hidden-sm hidden-xs co-text-service">
                    <p>{item.codebase}</p>
                  </div>
                  <div className="col-lg-2 col-md-2 hidden-sm hidden-xs co-text-pod">
                    <p><ResourceIcon kind="Pod" /><span>{item.port}</span></p>
                  </div>
                </div>
              </div>
            )
            });    
    }
  }

  render() {
    return(
      <div className="codeBaseList">
      <h2 className="codeBaseMainTitle"> View namespaces in {this.props.namespace ? this.props.namespace : 'all projects'} </h2>
        <div className="codeBaseHeader">
          <ListHeader>
            <ColHead className="col-lg-2 col-md-2 col-sm-3 col-xs-4" sortField="metadata.name">App</ColHead>
            <ColHead className="col-lg-2 col-md-2 col-sm-3 col-xs-4" sortField="metadata.namespace">Namespace</ColHead>
            <ColHead className="col-lg-2 col-md-2 col-sm-3 col-xs-4" sortField="metadata.labels">Build Type</ColHead>
            <ColHead className="col-lg-4 col-md-4 hidden-sm hidden-xs co-text-service" sortField="spec.selector">CodeBase</ColHead>
            <ColHead className="col-lg-2 col-md-2 hidden-sm hidden-xs" sortField="spec.selector">Port</ColHead>
          </ListHeader>          
        </div>
        {this.display}
      </div>
        
    )
  }
}

type codebaseListProps = {
  list: Array<any>;
  namespace: string;
};