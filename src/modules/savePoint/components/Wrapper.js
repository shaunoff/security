import React, { Component } from 'react';
import { Segment,Header,Icon } from 'semantic-ui-react';
import generatePdf from '../pdf/generatePdf'
import SavePointTable from './SavePointTable'

class Wrapper extends Component {
	createPdf(data){
		generatePdf(data)
	}
	render() {
		console.log(this.props.savePoints)
		return (
			<div style={{display: 'flex'}}>
				<div style={{flex: 4,margin: '5px'}}>
					<Segment>
						<Header as="h5" color="teal">Save Points</Header>
						<SavePointTable createPdf={this.createPdf} savePoints={this.props.savePoints}/>
					</Segment>
				</div>
			</div>

		);
	}

}

export default Wrapper;
