import * as React from 'react';
import { connect } from 'react-redux';
import TopologyDataController from '../components/topology/TopologyDataController';
import TopologyLayout from '../components/topology/TopologyLayout';

const TopologyPage: React.SFC = (props) => {
  console.log('Props', props)
  const { namespace } = props;

  return (
  <TopologyDataController namespace={namespace}>
    <TopologyLayout namespace={namespace}/>
  </TopologyDataController>
)};

const mapStateToProps = (state) => {
  console.log(state.UI.get('activeNamspace'));
  return {namespace: state.UI.get('activeNamespace')};
}
export default connect(mapStateToProps)(TopologyPage);
