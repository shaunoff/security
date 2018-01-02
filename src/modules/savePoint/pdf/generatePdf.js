import jspdf from 'jspdf';
import createControl from './createControl';
import createText from './createText';


const generatePdf = (data) => {
	const sectionData = JSON.parse(data.savePointData)
	console.log(sectionData)
	const doc = new jspdf({
	  orientation: 'portrait',
	  unit: 'pt',
	  format: [612,792]
	})
	let height = 60

	doc.line(20, 600, 60, 600)
	doc.line(20, 650, 60, 650)
	doc.line(20, 700, 60, 700)
	//createHeader = (text, size, doc, height)
	sectionData
		.sort((a,b)=> a.id < b.id ? -1 : 1)
		.forEach(section => {
			height = createControl(`${section.id}. ${section.name}`, 16, doc, height)
			section.controls
			.sort((a,b)=> a.sectionIndex < b.sectionIndex ? -1 : 1)
			.forEach(control => {
				height = createText(`${control.controlNumber} : ${control.controlText}`, doc, height, true)
				height = createText(control.controlResult, doc, height, false)
			})
			doc.addPage()
			height = 60
		})

	doc.save('two-by-four.pdf')
}

export default generatePdf
