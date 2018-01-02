import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

const SavePointTable = ({savePoints,createPdf}) => (
	<Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Version ID</Table.HeaderCell>
        <Table.HeaderCell>Created</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
			{savePoints.map(savePoint => (
				<Table.Row key={savePoint.id}>
	        <Table.Cell>{savePoint.id}</Table.Cell>
	        <Table.Cell>{moment(savePoint.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Table.Cell>
	        <Table.Cell onClick={()=>createPdf(savePoint)}>Actions</Table.Cell>
	      </Table.Row>
			))}
    </Table.Body>
	</Table>
);

export default SavePointTable;
