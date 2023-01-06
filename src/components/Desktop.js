import { useEffect, useState } from "react";
import { storage } from "../fireBase";
import { Icon } from "./Icons";
import { TbMathFunctionOff } from "react-icons/tb";
import clsx from "clsx";
import {
	getStorage,
	getDownloadURL,
	ref,
	uploadBytes,
	listAll,
	getMetadata,
} from "firebase/storage";
import {
	getFileExtension,
	iconHandler,
	removeFileExtension,
} from "../utils/functions";
import { FaRemoveFormat } from "react-icons/fa";

export default function Desktop() {
	const [checked, isChecked] = useState(false);
	const [toggle, setToggle] = useState("main");
	const [uploadFiles, setUploadFiles] = useState([]);
	const [savedFiles, setSavedFiles] = useState("");
	const [confirmUpload, setConfrimUpload] = useState(false);
	const fileArray = Array.from(savedFiles);
	const uploadArray = Array.from(uploadFiles);
	const storage = getStorage();

	function onDragHandler(e) {
		e.preventDefault();
	}

	useEffect(() => {
		listAll(ref(storage, "/")).then((res) => setSavedFiles(res.items));
	}, []);

	function cancelClick() {
		setUploadFiles([]);
		setToggle("main");
	}

	function onDropHandler(e) {
		e.preventDefault();
		const files = e.dataTransfer.files;
		setUploadFiles(files);
	}

	// *****  list olsuturup listten cagir  listall()

	function upload() {
		for (let i = 0; i < uploadFiles.length; i++) {
			const newFile = uploadFiles[i];
			const fileRef = ref(storage, `/${newFile.name}`);
			uploadBytes(fileRef, newFile).then((snapshot) => "");
			setUploadFiles((prev) => [...prev, newFile]);
		}
		alert("uploaded");
		setToggle("main");
	}

	// <Icon src={"w11"} className="h-10 w-10 " w />;
	return (
		<div
			onDragOver={onDragHandler}
			onDrop={onDropHandler}
			className="bg-[url(https://i.redd.it/hder59l7zw051.png)] scrollbar-hide  bg-opacity-40 overflow-y-scroll relative bg-center bg-cover h-screen"
		>
			{toggle === "Upload" ? (
				<div
					className={
						"absolute h-3/4 w-[90%] grid  duration-200 p-5 grid-cols-4 gap-4 overflow-y-scroll  left-[4%] top-14 z-10 rounded-md  bg-slate-200 "
					}
				>
					{uploadArray.length == 0 ? (
						<p className="absolute text-7xl font-mono  top-[35%] right-[10%]">
							{" "}
							Please Drag & Drop The Files Here
						</p>
					) : (
						""
					)}

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
							className="bg-gray-400 h-20 w-44  hover:bg-slate-600 active:bg-white  rounded-md p-2"
						>
							Upload
						</button>
						<button
							onClick={cancelClick}
							className="bg-gray-400 h-20 w-44  animation-iteration-count hover:bg-slate-600 active:bg-white f rounded-md p-2"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				""
			)}
			{toggle === "main" ? (
				<div className="grid p-10 grid-cols-6 cursor:pointer gap-5">
					<button
						onClick={() => alert("that doesnt do anything")}
						hidden={confirmUpload}
						className=" fixed right-10 hover:animate-pulse hover:text-lime-400 hover:duration-300 active:animate-ping  top-4"
					>
						<TbMathFunctionOff size={65} />
					</button>
					{fileArray.map((item, index) => (
						<div className="h-24 w-28 active:pointer-events-none relative  hover:bg-blue-200 active:bg-blue-400   text-decoration-none  flex items-center flex-col  pt-2 rounded-lg overflow-clip  ">
							<Icon className={"h-14"} src={getFileExtension(item.name)} />

							<p className="text-center text-sm  select-none mt-2 text-decoration-none">
								{item.name.length >= 8
									? item.name.slice(0, 4) + "..."
									: removeFileExtension(item.name)}
							</p>
						</div>
					))}
				</div>
			) : toggle === "Download" ? (
				<div className="grid p-10 grid-cols-6 cursor:pointer gap-5">
					<button
						onClick={upload}
						hidden={confirmUpload}
						className="absolute right-10 hover:animate-pulse hover:text-lime-400 hover:duration-300 active:animate-ping  top-4"
					>
						<TbMathFunctionOff size={65} />
					</button>
					{fileArray.map((item, index) => (
						<div className="h-24 w-28  active:pointer-events-none relative hover:bg-blue-200 active:bg-blue-400  text-decoration-none  flex items-center flex-col p-2  rounded-lg overflow-clip  ">
							<Icon className={"h-14"} src={getFileExtension(item.name)} />
							<input
								type="checkbox"
								name=""
								id=""
								className="absolute "
								checked={isChecked}
							/>

							<p className="text-center text-sm  select-none mt-2 text-decoration-none">
								{item.name.length >= 8
									? item.name.slice(0, 6) + "..."
									: removeFileExtension(item.name)}
							</p>
						</div>
					))}{" "}
				</div>
			) : toggle === "Preview" ? (
				<div className="grid  p-10 grid-cols-6 cursor:pointer gap-5">
					{fileArray.map((item, index) => (
						<>{}</>
					))}
				</div>
			) : (
				""
			)}
			<input
				type="file"
				name="file_upload"
				onChange={(e) => setUploadFiles(e.target.files)}
				hidden
				id=""
			/>
			<div className="flex  fixed right-[40%] gap-7 top-1">
				<button
					onClick={() => setToggle("Upload")}
					type="button"
					className="outline-none duration-200 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
				>
					Upload
				</button>
				<button
					onClick={() => setToggle("Download")}
					type="button"
					className="outline-none duration-200 bg-blue-600 active:bg-violet-700 w-36  p-2 rounded-lg text-stone-100 font-mono"
				>
					Download & Delete
				</button>
				<button
					onClick={() => setToggle("Preview")}
					type="button"
					className="outline-none duration-200 bg-blue-600 active:bg-violet-700 w-36  p-2 rounded-lg text-stone-100 font-mono"
				>
					Preview
				</button>
			</div>
		</div>
	);
}
