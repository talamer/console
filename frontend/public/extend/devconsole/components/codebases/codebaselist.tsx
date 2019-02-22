import * as React from 'react';

export class CodeBaseList extends React.Component<codebaseListProps> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(){
      this.updateDisplay();
  }
  updateDisplay = () => {
    var list = this.props.list;
    if(list && list.length == 0){
        this.display = <h3 className = 'noCodebasesFound'> No codebases found. </h3>;
    }
    else 
    this.display = <h3 className = 'noCodebasesFound'> /loading from namespace. </h3>;
  }
  display = <h3 className = 'noCodebasesFound'> No codebases found. </h3>; 
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
  list: Array<Object>;
};