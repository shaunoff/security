import React from 'react';
import { Segment, Header, Checkbox, Form, List } from 'semantic-ui-react';
import SearchPolicy from './SearchPolicy'

const ControlEvidence = ({id, evidence, addEvidence,policies}) => (
			<Segment raised style={{margin: "5px 0px"}}>
				<Header color="teal" as="h5">CONTROL EVIDENCE</Header>
				<SearchPolicy id={id} addEvidence={addEvidence} policies={policies}/>
				<List divided relaxed>

						{evidence && evidence.map(item => (
							<List.Item>
								<List.Icon name='attach' size='large' color="teal" verticalAlign='middle' />
					      <List.Content>
					        <List.Header as='a'>{item.name}</List.Header>
					      </List.Content>
				    	</List.Item>
						))}

			  </List>
			</Segment>
);

export default ControlEvidence;
