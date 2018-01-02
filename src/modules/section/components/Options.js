import React, { Component } from 'react';
import {Checkbox, Divider} from 'semantic-ui-react'

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {checked: ""};
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(event, data){
		if(data.value === this.state.checked){
			this.setState({checked: ""},() => this.props.filterIncomplete(this.state.checked))
		}
		else{
			this.setState({checked: data.value}, () => this.props.filterIncomplete(this.state.checked))
		}
	}
	render() {
		return (
			<div style={{display: 'flex', flexDirection: "column"}}>
				<Checkbox checked={this.state.checked === "complete"} onChange={this.handleClick} value="complete" label='Completed' />
				<Checkbox checked={this.state.checked === "incomplete"} onChange={this.handleClick} value="incomplete" label='Incomplete' />
				<Divider />
				<Checkbox checked={this.state.checked === "passed"} onChange={this.handleClick} value="passed" label='Passed' />
				<Checkbox checked={this.state.checked === "notApplicable"} onChange={this.handleClick} value="notApplicable" label='Not Applicable' />
				<Checkbox checked={this.state.checked === "inherited"} onChange={this.handleClick} value="inherited" label='Inherited' />
				<Checkbox checked={this.state.checked === "inProgress"} onChange={this.handleClick} value="inProgress" label='In Progress' />
				<Checkbox checked={this.state.checked === "failed"} onChange={this.handleClick} value="failed" label='Failed' />
			</div>
		);
	}

}

export default Options;
