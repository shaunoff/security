const createControl = (text, size, doc, height) =>{
	doc.setTextColor(69, 40, 160)
	doc.setFontSize(size)
	if (height >= 660) {
		doc.addPage();
		height = 40
	}
	doc.text(text, 40, height)
	height = height + 30
	return height
}
export default createControl
