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
	        className={'donut-chart-test'}
	        innerRadius={80}
	        radius={this.state.width * 0.3}
					colorType='literal'
					showLabels={true}
	        getAngle={d => d.theta}
	        data={[
	          {theta: this.props.passed, color: '#21ba45', className: "testywesty"},
	          {theta: this.props.inherited, color: '#2185d0'},
						{theta: this.props.notApplicable, color: '#767676'},
						{theta: this.props.inProgress, color: '#f2711c'},
	          {theta: this.props.failed, color: '#db2828'}
	        ]}
					width={this.state.width * 0.7}
	        height={this.state.width * 0.7}/>
					<div style={{display: 'flex', flexDirection: 'column',alignItems: 'center',margin: '15px'}}>
						<div>
							<Header as="h5" color="teal">Key</Header>
						</div>

						<div style={{display: 'flex', flexWrap: 'wrap'}}>
							<KeyComponent color="#21ba45" title="Passed"/>
							<KeyComponent color="#f2711c" title="In Progress"/>
							<KeyComponent color="#2185d0" title="Inherited"/>
							<KeyComponent color="#767676" title="Not Applicable"/>
							<KeyComponent color="#db2828" title="Failed"/>
						</div>
					</div>
			</div>

		)
	}
}

export default CompleteChart;
