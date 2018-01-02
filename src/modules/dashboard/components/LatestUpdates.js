import React from 'react';
import {Segment, Header} from 'semantic-ui-react';
import ControlPreview from './ControlPreview'

const LatestUpdates = ({controls}) => {
	const latest = controls.slice(0,10)
	return (
		<Segment style={{margin: '5px'}} >
			<Header as="h5" color="teal">LATEST UPDATES</Header>
			{latest.map(item => <ControlPreview control={item}/>)}
		</Segment>
	)
}
export default LatestUpdates;
