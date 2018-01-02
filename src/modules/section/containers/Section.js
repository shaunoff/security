import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios'

import Wrapper from '../components/Wrapper';

import {
  filterIncomplete,
  changeOpen
} from "../actions"

class Section extends Component {
render(){
    if(!this.props.sections) return <div>Loading....</div>
    return (
      <Wrapper {...this.props}/>
    )


  }
}

const filterState = (state,filter) =>{
  if (!filter) return state
  const filtered = state.map(section => {
    const newSection = {...section}
    if(filter === "incomplete"){
      newSection.controls = newSection.controls.filter(control => control.complete === false)
    }
    else if(filter === "complete"){
      newSection.controls = newSection.controls.filter(control => control.complete === true)
    }
    else {
      newSection.controls = newSection.controls.filter(control => control.status === filter)
    }

    return newSection
  })

  return filtered
}

function mapStateToProps(state,props){
  return {
    controls: state.controls,
    open: state.sections.open,
    sections: filterState(state.sections.sections, state.sections.filter)
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({filterIncomplete,changeOpen},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Section)
