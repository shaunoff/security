import React, { Component } from 'react';
import { Segment,Header,Checkbox, Divider } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {bindActionCreators} from 'redux'

import {updateControl} from "../actions";

class ControlCompletion extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(){
		this.props.updateControl({complete: !this.props.control.complete, id: this.props.control.id})
	}
	render() {
		const {control} = this.props
		const disableChecked = hasResult(control) && hasEvidence(control) && statusChecked(control)
		return (
			<Segment raised style={{margin: "5px 0px"}}>
				<Header color="teal" as='h5'>CONTROL COMPLETION</Header>
				<Checkbox checked={control.complete} onChange={this.handleChange} label='COMPLETE' disabled={!disableChecked}/>
				<Divider />
				<div style={{display: 'flex', flexDirection: "column"}}>
					<Checkbox checked={hasResult(control)} disabled={true} label='Results'/>
					<Checkbox checked={hasEvidence(control)} label='Evidence' disabled={true}/>
					<Checkbox checked={statusChecked(control)} disabled={true} label='Status'/>
				</div>
			</Segment>
		);
	}
}

function mapStateToProps(state,props){
  return {
    control: state.controls.filter(control => control.id === +props.match.params.id)[0],
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({updateControl},dispatch)
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ControlCompletion));


ControlCompletion.defaultProps = {
	control: {
		policies: [],
		controlResult: '',
		status: "",
		complete: false
	}
 };
const statusChecked = (control) => {
	return control.status === 'inherited' || control.status === "passed" || control.status === "notApplicable"
}
const hasEvidence = (control) => {
	return control.policies.length > 0
}

const hasResult = (control) => {
	return control.controlResult.length > 0
}
