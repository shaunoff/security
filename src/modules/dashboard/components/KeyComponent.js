import React from 'react';
import { Segment,Header, Icon } from 'semantic-ui-react';

const KeyComponent = ({title, color}) => (
	<div style={{minWidth: "80px", height: '40px', display: 'flex', alignItems: 'Center'}}>
		<div style={{height: '20px', width: "40px", backgroundColor: color, borderRadius: '8px'}}>
		</div>
		<Header style={{margin: "0px 10px"}} as="h5">{title}</Header>
	</div>
);

export default KeyComponent;
