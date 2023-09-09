import Header from "../structural/header/Header";
import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { useGlobalState } from "../../contexts/GlobalState";
import Home from "../home/Home";

export default function MainEntry() {
	const state = useGlobalState();
	const { darkMode } = state;

	return (
		<div
			className={darkMode ? "bp5-dark" : ""}
			style={{ width: "100vw" }}
		>
			<Header />
			<Home />
		</div>
	);
}
