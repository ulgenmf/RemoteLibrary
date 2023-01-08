import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { storage } from "../fireBase";
import { Icon } from "./Icons";
import { TbMathFunctionOff } from "react-icons/tb";
import { FcUpload } from "react-icons/fc";
import clsx from "clsx";
import {
	getStorage,
	getDownloadURL,
	ref,
	uploadBytes,
	listAll,
	getMetadata,
	deleteObject,
	deleteAll,
} from "firebase/storage";
import {
	getFileExtension,
	iconHandler,
	removeFileExtension,
} from "../utils/functions";
import { FaRemoveFormat } from "react-icons/fa";
import { async } from "@firebase/util";

export default function Desktop() {
	const [toggle, setToggle] = useState("Preview");
	const [uploadFiles, setUploadFiles] = useState([]);
	const [savedFiles, setSavedFiles] = useState("");
	const fileArray = Array.from(savedFiles);

	const [checkedFiles, setCheckedFiles] = useState([]);
	const [confirmUpload, setConfrimUpload] = useState(false);
	const uploadArray = Array.from(uploadFiles);
	const storage = getStorage();
	function onDragHandler(e) {
		e.preventDefault();
	}

	useEffect(() => {
		listAll(ref(storage, "/")).then((res) => setSavedFiles(res.items));
	}, [toggle]);

	// ******** finda way to refresh the page  useEffect is not working the way it suppose to maybe asnyc function ?
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

	// function getDownloadUrl() {
	// 	setIsChecked((prev) => !prev);
	// 	console.log(isChecked);
	// }

	function a() {
		listAll(ref(storage, "/")).then((res) => {
			res.items.forEach((x) => "");
		});
	}

	async function upload() {
		for (let i = 0; i < uploadFiles.length; i++) {
			const newFile = uploadFiles[i];
			const fileRef = ref(storage, `/${newFile.name}`);
			uploadBytes(fileRef, newFile).then((snapshot) => "");
			setUploadFiles((prev) => [...prev, newFile]);
		}
		setTimeout(() => {
			if (uploadFiles.length > 1) {
				alert("File Has Been Uploaded");
			} else {
				alert("No File Has Been Uploaded");
			}
		}, 200);

		setUploadFiles([]);
		setToggle("Preview");

		// *** you might ask why use this when useEffect has already been used up there, the useEffect is just no working properly and forces a infinite loop for some reason
	}

	function deleteAll() {
		for (let i = 0; i < fileArray.length; i++) {
			const element = fileArray[i];

			deleteObject(ref(storage, `/${element.name}`));
		}
		alert("Everything Has Been Deleted");
	}
	function selectAll() {
		const chcekedFules = [...fileArray];
		setCheckedFiles(chcekedFules);
	}

	function deleteHandler(item) {
		for (let i = 0; i < checkedFiles.checkedFiles; i++) {
			const element = checkedFiles[i];
			deleteObject(ref(storage, `/${element}`));
		}
		deleteObject(ref(storage, `/${item}`));
		alert("File/s deleted");
	}
	function deleteMultiple() {
		for (let i = 0; i < checkedFiles.length; i++) {
			const element = checkedFiles[i];
			deleteObject(ref(storage, `/${element}`));
		}
		alert("selected fiels gone");
	}
	function checkboxHandler(item) {
		if (checkedFiles.includes(item)) {
			setCheckedFiles(checkedFiles.filter((i) => i !== item));
		} else {
			setCheckedFiles([...checkedFiles, item]);
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
								<span className=" animation-1s font-extrabold animate-pulse text-sm text-red-700  ">
									duplicates will be ignored
								</span>
							</p>
						</div>
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
			{toggle === "Preview" ? (
				<div className="grid p-10 grid-cols-6 cursor:pointer gap-5">
					<button onClick={deleteMultiple}>[[[[[[[[[[[[[[[[[[[[[[[[</button>
					{console.log(checkedFiles)}
					<button
						onClick={() => alert("that doesnt do anything")}
						hidden={confirmUpload}
						className=" fixed right-10 hover:animate-pulse hover:text-lime-400 hover:duration-300 active:animate-ping  top-4"
					>
						<TbMathFunctionOff size={65} />
					</button>
					{fileArray.map((item, index) => (
						<label htmlFor={item.name}>
							<button
								className="bg-purple-500  p-2"
								onClick={() => deleteHandler(item.name)}
							>
								x
							</button>
							<div className=" w-28 active:pointer-events-none relative  hover:bg-blue-200 active:bg-blue-400   text-decoration-none  flex items-center flex-col  pt-2 rounded-lg overflow-clip  ">
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
							: "outline-none duration-200 hover:opacity-100 opacity-10 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
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
							: "outline-none duration-200 hover:opacity-100 opacity-10 bg-blue-600 active:bg-violet-700 w-36   p-2 rounded-lg text-stone-100 font-mono"
					)}
				>
					Preview
				</button>
			</div>{" "}
			<button
				hidden={fileArray.length <= 2 ? true : false}
				onClick={deleteAll}
				className="bg-pink-900"
			>
				delete All
			</button>
		</div>
	);
}
