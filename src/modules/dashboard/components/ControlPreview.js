import React from 'react';
import { Link} from 'react-router-dom';
import {Icon, Label,Header} from 'semantic-ui-react';

const table = {
	passed: {
		color: 'green',
		text: 'Passed',
		icon: 'checkmark',
		iconColor: "green"
	},
	inherited: {
		color: 'blue',
		text: 'Inherited',
		icon: 'checkmark',
		iconColor: "blue"
	},
	notApplicable: {
		color: 'grey',
		text: 'Not Applicable',
		icon: 'checkmark',
		iconColor: "grey"
	},
	inProgress: {
		color: 'orange',
		text: 'In Progess',
		icon: 'wait',
		iconColor: "orange"
	},
	failed: {
		color: 'red',
		text: 'Failed',
		icon: 'warning',
		iconColor: 'red'
	},
}

const ControlPreview = ({control}) => (
	<Link  to={`/section/${control.id}`} style={{display: 'flex',alignItems: "center", margin: '20px 10px'}}>
		<div style={{margin: "6px 0px"}}><Icon color={table[control.status].iconColor} name={table[control.status].icon} /></div>
		<div style={{width: "60px", marginLeft: "30px"}}><Header color="teal" as='h5'>{control.controlNumber}</Header></div>
		<div><Label style={{width: '120px'}} color={table[control.status].color} horizontal>{table[control.status].text}</Label></div>
	</Link>
);

export default ControlPreview;
