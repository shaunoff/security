import React, { Component } from 'react';
import { Segment,Header,Form, Button } from 'semantic-ui-react'

class ComplianceBlock extends Component {
	constructor(props) {
		super(props);
		this.state= {
			assessment: props.control.controlResult,
			notes: props.control.internalNotes
		};
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(){
		this.props.update({
			id: this.props.id,
			controlResult: this.state.assessment,
			internalNotes: this.state.notes
		})

	}
	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	render() {
		const {control} = this.props
		console.log('gdhgdshjfhjsd',this.props)
		return (
			<Segment raised style={{margin: "5px 0px"}}>
				<Header color="teal" as='h5'>COMPLIANCE</Header>
				<Form onSubmit={this.handleSubmit}>
					<Form.TextArea rows={14} name="assessment" onChange={this.handleChange} value={this.state.assessment} label='Assessment' placeholder='How is the criteria met?' />
					<Form.TextArea rows={6} name="notes" value={this.state.notes} onChange={this.handleChange} label='Internal Notes' placeholder='These notes are for informatinal purposes and wont be included in the security plan'/>
					<Button onClick={this.handleSubmit} floated='right' color='teal'>Submit</Button>
				</Form>
			</Segment>
		);
	}

}

ComplianceBlock.defaultProps = {
	control: {}
 };

export default ComplianceBlock;
