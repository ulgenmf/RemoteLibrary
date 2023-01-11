import GoogleDocsViewer from "react-google-docs-viewer";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export function Preview(ext, link) {
	return (
		<>
			{console.log(ext, link)}
			<div>
				{ext === "pdf" ? (
					<Document file={`${link}`}>
						<Page pageNumber={1} />
					</Document>
				) : (
					<img src={`${link}`} alt="Sorry unsupported format" />
				)}
				{ext === "docx" ?? (
					<GoogleDocsViewer width="600px" height="780px" fileUrl={`${link}`} />
				)}
			</div>
		</>
	);
}
