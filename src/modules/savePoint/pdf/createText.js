const createText = (text, doc, height, controlTitle) =>{
	doc.setTextColor(100)
	doc.setFontSize(12)
	if (controlTitle){
		doc.setTextColor(107,173,167)
	}
	const lines = doc.splitTextToSize(text, 612 - 80)
	lines.forEach(line => {
		if (height >= 750) {
			doc.addPage();
			height = 40
		}
		doc.text(line, 40, height)
		height = height + 18
	})
	controlTitle ? height = height + 4 : height = height + 40
	return height
}
export default createText
