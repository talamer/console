import * as React from 'react';
import { ResourceIcon } from '../../../../components/utils';

export class CodeBaseList extends React.Component<codebaseListProps> {
  constructor(props) {
    super(props);
    this.updateDisplay();
    console.log(this.display);
  }
  display:Object = <h3 className = 'noCodebasesFound'> No codebases found. </h3>; 
  updateDisplay = () => {
    var list = this.props.list;
    if(list && list.length == 0){
        this.display = <h3 className = 'noCodebasesFound co-text-service'> No codebases found. </h3>;
    }
    else{ 
        console.log("else",list,list.length)
        this.display = list.map((item,key)=>{
            return ( 
                <div className="co-ip-row" key={key}>
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-4 col-xs-6 co-text-service">
                    <p>{item.name || '-'}</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-4 col-xs-6 co-text-service">
                    <p className="co-text-node"><ResourceIcon kind="Node" /><span>{item.namespace}</span></p>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-4 hidden-xs co-text-service">
                    <p>{item.description}</p>
                  </div>
                  <div className="col-lg-3 col-md-3 hidden-sm hidden-xs co-text-pod">
                    <p><ResourceIcon kind="Pod" /><span>{item.location}</span></p>
                  </div>
                </div>
              </div>
            )
            });    
    }
  }
  render() {
    return(
      <React.Fragment>
      <div className="codeBaseList">
        {this.display}
      </div>
      </React.Fragment>
    )
  }
}

type codebaseListProps = {
  list: Array<any>;
};