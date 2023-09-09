import { useGlobalState, useSetGlobalState } from "../../contexts/GlobalState";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import SampleUpload from "./SampleUpload";

export default function Home() {
	const { darkMode }  = useGlobalState();

	return (
		<div className={darkMode ? "bg-gray-900 text-white bp3-dark" : "bg-white text-black"}>
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<h1 className="text-6xl text-center mb-4 font-semibold">Budgeting Made Accessible</h1>
				<h2 className="text-4xl text-center mb-6">Upload your own financial history or test our product with a fictional profile</h2>
				<p className="text-xl text-center px-6">
            placeholder for now
				</p>

				<div className="flex w-full justify-between px-48 py-12">
					<SampleUpload text={"John is a 24 year old software engineer who loves fitness gadgets and the outdoors"} />
					<SampleUpload text={"Tina, a 28-year-old marketer, is all about mindfulness."} />
					<SampleUpload text={"Dani is a 20 year old Duke student who just might be getting Alpaca a little too often"} />
				</div>
			</div>
		</div>
	);
}
