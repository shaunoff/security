import React, { Component } from 'react';
import { Segment,Header,Accordion,Icon } from 'semantic-ui-react';

import AccordionSection from './AccordionSection';
import Options from './Options';

class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: null
		};
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(index){
		index === this.props.open ? this.props.changeOpen(null) : this.props.changeOpen(index)

	}
	render() {
		return (
			<div style={{display: 'flex'}}>
				<div style={{flex: 4,margin: '5px'}}>
					<Segment>
						<Header as="h5" color="teal">Compliance Sections</Header>
							<Accordion fluid styled>
								{this.props.sections.map(section => (
									<AccordionSection key={section.id} handleClick={this.handleClick} controls={this.props.controls} open={this.props.open} activeIndex={this.state.activeIndex} section={section}/>
								)
								)}
							</Accordion>
					</Segment>
				</div>
				<div style={{flex: 1,margin: '5px'}}>
					<Segment>
						<Header as="h5" color="teal">Options</Header>
						<Options filterIncomplete={this.props.filterIncomplete}/>
					</Segment>
				</div>
			</div>

		);
	}

}

export default Wrapper;
