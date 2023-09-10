
import Header from "../structural/header/Header";
import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { useGlobalState } from "../../contexts/GlobalState";
import Home from "../home/Home";
import Report from "../report/Report";
import LoadingScreen from "../home/Loading";

export default function MainEntry() {
	const state = useGlobalState();
	const { darkMode, loading, report } = state;
  
  
	if (loading) {
		return <LoadingScreen />;
	}
  
	return (
    
		<div
			className={darkMode ? "bp5-dark" : ""}
			style={{ width: "100vw", maxHeight: "100vh", overflow: "hidden" }}
		>
			<Header />{
				report ?
					<Report />
					:
					<Home />}
		</div>
	);
}
