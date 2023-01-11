import clsx from "clsx";
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import GoogleDocsViewer from "react-google-docs-viewer";
import { FcUpload } from "react-icons/fc";
import { ImFolderDownload } from "react-icons/im";
import { MdDeleteForever, MdToggleOff, MdToggleOn } from "react-icons/md";
import { TbMathFunctionOff } from "react-icons/tb";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import {
	downloadFile,
	getFileExtension,
	removeFileExtension,
} from "../utils/functions";
import { Icon } from "./Icons";

export default function Desktop() {
	const [numPages, setNumPages] = useState(null);
	const [link, setLink] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [toggle, setToggle] = useState("Preview");
	const [metaData, setMetaData] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);
	const [savedFiles, setSavedFiles] = useState("");
	const [switchToggle, setSwitchToggle] = useState(false);
	const [downloadData, setDownloadData] = useState([]);
	const [checkedFiles, setCheckedFiles] = useState([]);
	const [confirmUpload, setConfrimUpload] = useState(false);
	const uploadArray = Array.from(uploadFiles);
	const fileArray = Array.from(savedFiles);
	const metaArray = Array.from(metaData);
	const storage = getStorage();
	function onDragHandler(e) {
		e.preventDefault();
	}
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function previewElementUrlHandler(name) {
		getDownloadURL(ref(storage, `/${name}`)).then((res) => {
			"";
		});
	}

	useEffect(() => {
		function a() {
			for (let i = 0; i < checkedFiles.length; i++) {
				const element = checkedFiles[i];
				getDownloadURL(ref(storage, `/${element}`)).then((res) => {
					setDownloadData((prev) => [
						...prev,
						{
							name: `${element}`,
							source: `${res}`,
						},
					]);
					checkedFiles.length == 0 ?? setDownloadData([]);
				});
			}
		}
		setDownloadData(
			downloadData.filter((obj, index) => {
				return (
					downloadData.findIndex((obj2) => {
						return obj.id === obj2.id;
					}) === index
				);
			})
		);
		listAll(ref(storage, "/")).then((res) => setSavedFiles(res.items));
		a();
	}, [savedFiles]);

	function cancelClick() {
		setUploadFiles([]);
		setToggle("Preview");
	}

	function onDropHandler(e) {
		e.preventDefault();
		const files = e.dataTransfer.files;
		setUploadFiles(files);
	}

	async function upload() {
		for (let i = 0; i < uploadFiles.length; i++) {
			const newFile = uploadFiles[i];
			const fileRef = ref(storage, `/${newFile.name}`);
			uploadBytes(fileRef, newFile).then((snapshot) => "");
			setUploadFiles((prev) => [...prev, newFile]);
		}

		if (uploadFiles.length >= 1) {
			alert("File/s Has Been Uploaded");
		} else {
			alert("Something Went Wrong");
		}
		setTimeout(() => {}, 300);
		setToggle("Preview");
		setUploadFiles([]);
	}

	function deleteAll() {
		for (let i = 0; i < fileArray.length; i++) {
			const element = fileArray[i];

			deleteObject(ref(storage, `/${element.name}`));
		}
		alert("Everything Has Been Deleted");
		setToggle("Preview");
	}

	function deleteHandler(item) {
		for (let i = 0; i < checkedFiles.length; i++) {
			const element = checkedFiles[i];
			deleteObject(ref(storage, `/${element}`));
		}
		deleteObject(ref(storage, `/${item}`));
		alert("File/s deleted");
		setToggle("Preview");
	}
	function deleteMultiple() {
		for (let i = 0; i < checkedFiles.length; i++) {
			const element = checkedFiles[i];
			deleteObject(ref(storage, `/${element}`));
		}
		alert("selected fiels are gone");
		setCheckedFiles([]);
		setToggle("Preview");
	}
	function checkboxHandler(item) {
		if (checkedFiles.includes(item)) {
			setCheckedFiles(checkedFiles.filter((i) => i !== item));
		} else {
			setCheckedFiles([...checkedFiles, item]);
		}
	}

	let timeUpload = "";

	function downloadFileHanlder() {
		for (let i = 0; i < downloadData.length; i++) {
			const element = downloadData[i];

			const name = element.name;
			const source = element.source;
			downloadFile({ source, name });
		}
	}
	return (
		<div
			onDrop={(e) => e.preventDefault()}
			onDragOver={onDragHandler}
			className="bg-[url(https://i.redd.it/hder59l7zw051.png)] scrollbar-hide  bg-opacity-40 overflow-y-scroll relative bg-center bg-cover h-screen"
		>
			{toggle === "Upload" ? (
				<div
					onDrop={onDropHandler}
					className={
						"absolute h-3/4 w-[90%] grid  duration-200 p-5 grid-cols-4 gap-4 overflow-y-scroll  left-[4%] top-14 z-10 rounded-md  bg-slate-200 "
					}
				>
					{uploadArray.length == 0 ? (
						<div className="absolute top-[25%] text-center left-[15%] ">
							<button className="   ">
								<label>
									{" "}
									<input
										type="file"
										name="asd"
										id=""
										multiple
										hidden
										onChange={(e) => setUploadFiles(e.target.files)}
									/>
									<FcUpload className="hover:cursor-pointer  mb-5" size={60} />
								</label>
							</button>
							<p className=" text-7xl font-mono   ">
								Please Click The Icon <br />
								or <br />
								Drag & Drop The Files Here
								<br />
								<span className=" absolute left-[25%] mt-10 animation-1s font-extrabold animate-pulse text-sm text-red-700  ">
									duplicates will be ignored <br />
									&&
									<br />
									Please Dont Forget To Select Files Before Clicking The `Upload`
								</span>
							</p>
						</div>
					) : (
						""
					)}{" "}
					{uploadArray.map((item, index) => (
						<div className="h-24 w-28 active:pointer-events-none relative  hover:bg-blue-200 active:bg-blue-400   text-decoration-none  flex items-center flex-col  pt-2 rounded-lg overflow-clip  ">
							<Icon className={"h-14"} src={getFileExtension(item.name)} />
							<p className="text-center text-sm  select-none mt-2 text-decoration-none">
								{item.name.length >= 8
									? item.name.slice(0, 4) + "..."
									: removeFileExtension(item.name)}
							</p>
						</div>
					))}
					<div className=" fixed z-20  text-3xl font-mono  rounded-md flex gap-5  bottom-32 right-[40%] ">
						<button
							onClick={upload}
							className={clsx(
								uploadFiles.length < 1
									? "bg-gray-400 h-20 w-44  pointer-events-none invalid: hover:bg-slate-600 active:bg-white  rounded-md p-2"
									: "bg-gray-400 h-20 w-44  hover:bg-slate-600 active:bg-white  rounded-md p-2"
							)}
						>
							Upload
						</button>
						<button
							onClick={cancelClick}
							className="bg-gray-400 h-20 w-44  animation-iteration-count hover:bg-slate-600 active:bg-white f rounded-md p-2"
						>
							{" "}
							Cancel
						</button>
					</div>
				</div>
			) : (
				""
			)}

			{toggle === "Preview" ? (
				<div className="grid   grid-cols-6 cursor:pointer gap-5">
					<div className="fixed right-10  top-4">
						<div className="flex flex-col gap-5 items-center">
							<button
								className="hover:animate-pulse mt-6  hover:text-lime-400 hover:duration-300 active:animate-ping"
								onClick={deleteMultiple}
							>
								<TbMathFunctionOff size={65} />
								<p className="font-mono text-white">
									Delete <br />
									Selected
								</p>
							</button>
							<button
								onClick={deleteAll}
								hidden={confirmUpload}
								className="  hover:animate-pulse  hover:text-red-400 hover:duration-300   items-center active:animate-ping"
							>
								<MdDeleteForever size={65} />
								<p className="font-mono   text-white">
									Delete <br />
									<span className="font-extrabold text-lg">ALL</span>
								</p>
							</button>

							<button
								hidden={confirmUpload}
								// qwe
								onClick={downloadFileHanlder}
								className="  hover:animate-pulse  hover:text-lime-400 hover:duration-300   items-center active:animate-ping"
							>
								<ImFolderDownload size={65} />

								<p className="font-mono   text-white">
									Download <br />
									Selected
								</p>
							</button>
						</div>
					</div>
					{fileArray.map((item, index) => (
						<label htmlFor={item.name} className="flex items-center mt-24 flex-col">
							<div className=" w-28 active:pointer-events-none relative  hover:bg-blue-200 active:bg-blue-400   text-decoration-none  flex items-center flex-col  pt-2 rounded-lg overflow-clip  ">
								{!switchToggle ? (
									<>
										<Icon className={"h-14"} src={getFileExtension(item.name)} />
										<p className="text-center text-sm  select-none mt-2 text-decoration-none">
											{item.name.length >= 8
												? item.name.slice(0, 4) + "..."
												: removeFileExtension(item.name)}
										</p>

										<input
											type="checkbox"
											id={item.name}
											onChange={() => checkboxHandler(item.name)}
											value={item.name}
										/>
									</>
								) : (
									// qqq
									<>
										{getFileExtension(item.name) === "pdf" ? (
											<Document
												file={getDownloadURL((storage, `/${item.name}`)).then((res) => {
													return console.log(res);
												})}
											>
												<Page pageNumber={1} />
											</Document>
										) : getFileExtension(item.name) === "word" ? (
											<>
												<p>
													{" "}
													the api for excell and docx are really bad I removed the excel
													preview and this docx api sometimes just dont work
												</p>
												<GoogleDocsViewer
													width="600px"
													height="780px"
													fileUrl={
														"https://firebasestorage.googleapis.com/v0/b/my-project-475d0.appspot.com/o/catLoremUpsum%20(2).docx?alt=media&token=a796ba87-a749-457f-a10a-76171d87ab25"
													}
												/>
											</>
										) : (
											<img
												src={
													"https://firebasestorage.googleapis.com/v0/b/my-project-475d0.appspot.com/o/caft2%20(1).jpg?alt=media&token=c555a0ce-cb36-46a3-86ba-5267948458ee"
												}
												alt="Sorry unsupported format"
											/>
										)}
									</>
								)}
							</div>
						</label>
					))}
				</div>
			) : (
				""
			)}
			<div className="flex  fixed right-[40%] gap-7 top-1">
				<button
					onClick={() => setToggle("Upload")}
					type="button"
					className={clsx(
						toggle === "Upload"
							? "outline-none duration-200  hover:opacity-100 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
							: "outline-none duration-200 hover:opacity-100 opacity-30 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
					)}
				>
					Upload
				</button>

				<button
					onClick={() => setToggle("Preview")}
					type="button"
					className={clsx(
						toggle === "Preview"
							? "outline-none duration-200  hover:opacity-100 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
							: "outline-none duration-200 hover:opacity-100 opacity-30 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
					)}
				>
					Preview
				</button>
				<div className="relative">
					<button onClick={() => setSwitchToggle((prev) => !prev)}>
						{switchToggle ? <MdToggleOn size={60} /> : <MdToggleOff size={60} />}
					</button>
					<p className="text-2xl absolute top-0   left-20">
						{switchToggle ? "Picture Mode" : "Icon Mode"}
					</p>
				</div>
			</div>
		</div>
	);
}
// MdToggleOff;
// MdToggleOn;
