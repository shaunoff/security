import React, { Component } from 'react';
import { Segment, Header, Checkbox, Form } from 'semantic-ui-react';

class ControlStatus extends Component {
	handleChange(value){
		this.props.update({status: value, id: this.props.id});
	}
	render() {
		return (
			<Segment raised style={{ margin: '5px 0px' }}>
				<Header color="teal" as="h5">
					CONTROL STATUS
				</Header>
				<Form>
					<Form.Field style={{ margin: '0px' }}>
						<Checkbox
							radio
							label="Passed"
							name="passed"
							value="passed"
							style={{margin: "3px"}}
							checked={this.props.status === 'passed'}
							onClick={() => this.handleChange('passed')}
						/>
					</Form.Field>
					<Form.Field style={{ margin: '0px' }}>
						<Checkbox
							radio
							label="Inherited"
							name="inherited"
							value="inherited"
							style={{margin: "3px"}}
							checked={this.props.status === 'inherited'}
							onClick={() => this.handleChange('inherited')}
						/>
					</Form.Field>
					<Form.Field style={{ margin: '0px' }}>
						<Checkbox
							radio
							label="Not Applicable"
							name="notApplicable"
							value="notApplicable"
							style={{margin: "3px"}}
							checked={this.props.status === 'notApplicable'}
							onClick={() => this.handleChange('notApplicable')}
						/>
					</Form.Field>
					<Form.Field style={{ margin: '0px' }}>
						<Checkbox
							radio
							label="In progress"
							name="progress"
							value="progress"
							style={{margin: "3px"}}
							checked={this.props.status === 'progress'}
							onClick={() => this.handleChange('progress')}
						/>
					</Form.Field>
					<Form.Field style={{ margin: '0px' }}>
						<Checkbox
							radio
							label="Failed"
							name="failed"
							value="failed"
							style={{margin: "3px"}}
							checked={this.props.status === 'failed'}
							onClick={() => this.handleChange('failed')}
						/>
					</Form.Field>
				</Form>
			</Segment>
		);
	}
}

export default ControlStatus;
