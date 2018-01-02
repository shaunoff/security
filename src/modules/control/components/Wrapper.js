import React from 'react';
import { Segment,Header ,Button} from 'semantic-ui-react'

import ControlCompletion from '../containers/ControlCompletion';


import ControlSummary from './ControlSummary';
import ControlStatus from './ControlStatus';
import ComplianceBlock from './ComplianceBlock';
import ControlEvidence from './ControlEvidence';

const Wrapper = ({policies,control,updateControl,addEvidence,history}) => (
	<div style={{display: 'flex'}}>
		<div style={{flex: 4, margin: '5px', display: 'flex', flexDirection: 'column'}}>
			<ControlSummary control={control}/>
			<ComplianceBlock history={history} update={updateControl} id={control && control.id} control={control}/>
		</div>
		<div style={{flex: 1, margin: '5px', display: 'flex', flexDirection: 'column'}}>
			<ControlCompletion/>
			<ControlStatus status={control && control.status } id={control && control.id} update={updateControl}/>
			<ControlEvidence addEvidence={addEvidence} id={control && control.id} evidence={control && control.policies} policies={policies}/>
			<Segment raised style={{margin: "5px 0px"}}>
				<Button floated='right' color='teal' onClick={()=>history.goBack()}>Save</Button>
			</Segment>
		</div>
	</div>
);

export default Wrapper;
