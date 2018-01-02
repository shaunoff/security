import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios';


import Wrapper from '../components/Wrapper'


import {
  updateControl,
  addEvidence
} from "../actions"

class Control extends Component {

render(){
    return (
      <Wrapper {...this.props}/>
    )
  }
}


function mapStateToProps(state,props){
  return {
    control: state.controls.filter(control => control.id === +props.match.params.id)[0],
    policies: state.policies
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({updateControl,addEvidence},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Control)
