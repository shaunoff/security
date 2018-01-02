import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSavePoint} from "../actions";

import Wrapper from '../components/Wrapper';

class SavePoint extends Component {
  componentDidMount(){
    this.props.fetchSavePoint()
  }
  render(){
    if(!this.props.savePoints) return <div>Loading....</div>
    return (
      <Wrapper {...this.props}/>
    )
  }
}

function mapStateToProps(state,props){
  return {
    savePoints: state.savePoints
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSavePoint},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SavePoint);
