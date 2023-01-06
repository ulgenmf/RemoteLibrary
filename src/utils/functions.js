export function removeFileExtension(fileName) {
	const lastPeriodIndex = fileName.lastIndexOf(".");
	return fileName.slice(0, lastPeriodIndex);
}

export function iconHandler(fileName) {
	const lastPeriodIndex = fileName.lastIndexOf(".");
	const fileExtension = fileName.slice(lastPeriodIndex + 1);
	if (fileExtension === ".png" && ".JPG" && ".PNG" && ".jpg") {
		return "/../public/icons/img.png;";
	} else if (fileExtension === ".pdf") {
		return "/../public/icons/pdf.png";
	} else if (fileExtension === ".docx") {
		return "/../public/icons/txt.png";
	} else {
		return "/../public/icons/unknown.png";
	}
}

export function getFileExtension(fileName) {
	const lastPeriodIndex = fileName.lastIndexOf(".");
	const ext = fileName.slice(lastPeriodIndex);
	if (ext.toLowerCase() === ".png") {
		const icn = "img";
		return icn;
	} else if (ext.toLowerCase() === ".jpg") {
		return "img";
	} else if (ext.toLowerCase() === ".jpeg") {
		return "img";
	} else if (ext.toLowerCase() === ".docx") {
		return "word";
	} else if (ext.toLowerCase() === ".pdf") {
		return "pdf";
	} else if (ext.toLowerCase() === ".txt") return "txt";
	else if (ext.toLowerCase() === ".xlsx") {
		return "excel";
	} else {
		return "unknown";
	}
}
