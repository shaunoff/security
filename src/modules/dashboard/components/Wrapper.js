import React from 'react';
import { Segment,Header,Accordion,Icon } from 'semantic-ui-react';

import LatestUpdates from './LatestUpdates'
import CompleteChart from './CompleteChart'
import StatusChart from './StatusChart'

const Wrapper = ({complete, incomplete, controls,passed, failed, inherited, notApplicable, inProgress}) => {
	return (
		<div style={{display: 'flex'}}>
			<div style={{flex: 4}}>
				<div style={{display: 'flex'}}>
					<Segment  style={{flex: 1,margin: '5px'}}>
						<Header as="h5" color="teal">Controls Complete</Header>
						<CompleteChart complete={complete} incomplete={incomplete}/>
					</Segment>
					<Segment  style={{flex: 1,margin: '5px'}}>
						<Header as="h5" color="teal">Status Chart</Header>
						<StatusChart passed={passed} failed={failed} inProgress={inProgress} inherited={inherited} notApplicable={notApplicable}/>
					</Segment>
				</div>
			</div>
			<div style={{flex: 1}}><LatestUpdates controls={controls}/></div>
		</div>
	)
};

export default Wrapper;
