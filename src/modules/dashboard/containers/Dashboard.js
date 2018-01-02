import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Wrapper from '../components/Wrapper'


class Dashboard extends Component {

render(){
    return (
      <Wrapper {...this.props}/>
    )


  }
}
function compare(a,b) {
  const dateA = new Date(a.updated_at)
  const dateB = new Date(b.updated_at)
  if (dateA < dateB)
    return 1;
  if (dateA > dateB)
    return -1;
  return 0;
}
 function filterByStatus(state,status){
   return state.filter(control => control.status === status).length
 }
function mapStateToProps(state,props){
  return {
    controls: state.controls.sort(compare),
    passed: filterByStatus(state.controls, 'passed'),
    inProgress: filterByStatus(state.controls, 'inProgress'),
    inherited: filterByStatus(state.controls, 'inherited'),
    notApplicable: filterByStatus(state.controls, 'notApplicable'),
    failed: filterByStatus(state.controls, 'failed'),
    complete: state.controls.filter(control => control.complete === true).length,
    incomplete: state.controls.filter(control => control.complete === false).length
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
