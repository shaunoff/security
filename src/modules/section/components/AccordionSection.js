import React from 'react';
import { Segment,Header,Accordion,Icon, Label } from 'semantic-ui-react';
import ControlSummary from './ControlSummary'


const AccordionSection = ({open,controls,section,activeIndex,handleClick}) => (
	<div>
		<Accordion.Title  onClick={() => handleClick(section.id)} key={section.id} active={activeIndex === section.id} index={0}>
			<div style={{display: 'flex', height: '30px', alignItems: 'center'}}>
				<Icon name='dropdown' />
				<Header as="h5" color="grey" style={{marginLeft: '20px',width: '50px', position: "relative", top: '-5px'}}>{`3.${section.id}`}</Header>
				<Header as="h5" color="grey" style={{marginLeft: '10px',position: "relative", top: '-6px'}}>{section.name}</Header>
				<div style={{flex: 1}}></div>
				{section.controls.length > 0 && <Label circular style={{float: 'right'}} color='teal' >{section.controls.length}</Label>}

			</div>
		</Accordion.Title>
		<Accordion.Content active={open === section.id}>
      {section.controls.sort((a,b)=> a.sectionIndex < b.sectionIndex ? -1 : 1).map(control => <ControlSummary key={control.id} control={findControl(controls, control.id)}/>)}
    </Accordion.Content>
	</div>

);

export default AccordionSection;

const findControl = (controls, id) =>{
	return controls.find(control => control.id === id)
}
