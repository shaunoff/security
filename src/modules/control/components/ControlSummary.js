import React from 'react';
import { Segment,Header } from 'semantic-ui-react'

const ControlSummary = ({control}) => (
			<Segment raised style={{margin: "5px 0px"}}>
				<Header color="teal" as='h5'>{`CONTROL ${control.controlNumber || ""}`}</Header>
				<p>{control.controlText|| ""}</p>
			</Segment>
);

ControlSummary.defaultProps = {
	control: {}
 };


export default ControlSummary;
