/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { getOutput } from '../utils/visualization';

interface PipelineVisualizationProps {
  pipeline: any;
}
interface PipelineVisualizationStates {
  tasks: any;
}
class PipelineVisualization extends React.PureComponent<PipelineVisualizationProps,PipelineVisualizationStates> {
  constructor(props) {
    super(props);
    this.state = {
      tasks:[]
   }
    this.setState({ tasks: getOutput(this.props.pipeline.spec.tasks) });
  }

  render() {
    const stageStyle = {
      width: '400px',
      padding: '10px',
      align:'center'
    };

    const stageTitle = {
      color: 'blue',
      margin: '10px',
    };

    const parentDiv ={
      marginLeft: "5%"
    }

    const taskStyle = {
      color: 'blue',
      background: '#fafafa',
      border: '2px solid #777',
      width: '80px',
      display: 'inline',
      padding: '10px',
      margin: '5px'
    };
    const getTask = (task) =>{
      return <div style={taskStyle}>{task.name}</div>;
    }
    const output = getOutput(this.props.pipeline.spec.tasks)
    return (
      <div style={parentDiv}>
        <h1>Pipeline Visualization for {this.props.pipeline.metadata.name}</h1>
        <hr />
        {output.map((stage,i) =>{
          return( <><div style={stageStyle}>
                    <h4 style={stageTitle}>Stage {i+1}</h4>
                    {stage.map(t=>{
                        return getTask(t);
                      })
                    }
                  </div></>)
        })
        }
      </div>
    );
  }
}

export default PipelineVisualization;
