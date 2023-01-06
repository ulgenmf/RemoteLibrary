import "./App.css";
import Desktop from "./components/Desktop";

function App() {
	return (
		<div className="">
			<Desktop />

			<div
				id={"toolbar"}
				className="h-20 bg-[#fdfdfda6] w-full flex justify-between pt-1 absolute bottom-0"
			>
				<div id={"empty"}></div>
				<div className=" flex   gap-7 items-center m-auto  h-12   rounded-sm">
					<img
						src={"../assets/w11.png"}
						className="h-[70px] w-[70px]  hover:bg-blue-200 active:bg-red-400 active:pointer-events-none active:text-white p-2 rounded-md"
					/>
					<img
						src={"../assets/steam.png"}
						className="h-[70px] w-[70px]  hover:bg-blue-200 active:bg-red-400 active:text-white p-2 rounded-md active:pointer-events-none"
					/>
					<img
						src={"../assets/google.png"}
						className="h-[70px] w-[70px]  hover:bg-blue-200 active:bg-red-400 active:text-white p-2 rounded-md active:pointer-events-none"
					/>
					<img
						src={"../assets/ytube.png"}
						className="h-[70px] w-[70px]  hover:bg-blue-200 active:bg-red-400 active:text-white p-2 rounded-md active:pointer-events-none"
					/>
				</div>
				<div id={"empty"}></div>
			</div>
		</div>
	);
}

export default App;
