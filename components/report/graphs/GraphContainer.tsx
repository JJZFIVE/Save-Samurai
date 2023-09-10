import React from "react";
import Radar from "./radar/Radar";
import Xy from "./xy/Xy";
export default function GraphContainer() {
	return (
		<div className = 'flex  flex-col place-items-center'>
			<Xy width={600} height={380} />/
			<Radar width={440} height={430} />
			
		</ div>
	);
}
