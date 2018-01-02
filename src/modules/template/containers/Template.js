import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createSelector} from 'reselect'
import axios from 'axios'

import {
  exampleAction
} from "../actions"

class Template extends Component {

render(){

    return (
      <div>
        Hello
      </div>
    )


  }
}


function mapStateToProps(state,props){
  return {
    template: state.template
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({exampleAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Template)
