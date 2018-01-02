import React, { Component } from 'react';
import {RadialChart} from 'react-vis'
import { Segment,Header, Icon } from 'semantic-ui-react';

import KeyComponent from './KeyComponent'

class CompleteChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0
		};
	}
	componentDidMount() {
		this.setState({width: this.container.offsetWidth})
	}
	render() {
		return (
			<div style={{display: "flex", flexDirection: "column", alignItems: 'center'}} ref={element => {this.container = element}}>
				<RadialChart
	        className={'donut-chart-example'}
	        innerRadius={80}
	        radius={this.state.width * 0.3}
					style={{padding: '30px'}}
					colorType='literal'
					showLabels={true}
	        getAngle={d => d.theta}
	        data={[
	          {theta: this.props.complete, color: '#6bada7'},
	          {theta: this.props.incomplete, color: '#ccc'}
	        ]}
	        width={this.state.width * 0.7}
	        height={this.state.width * 0.7}/>
					<div style={{display: 'flex', flexDirection: 'column',alignItems: 'center',margin: '15px'}}>
						<div>
							<Header as="h5" color="teal">Key</Header>
						</div>

						<div style={{display: 'flex'}}>
							<KeyComponent color="#6bada7" title="Complete"/>
							<KeyComponent color="#ccc" title="Incomplete"/>
						</div>
					</div>
			</div>

		)
	}
}

export default CompleteChart;
