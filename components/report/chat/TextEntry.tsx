import React, { useState, useRef, useEffect } from "react";
import { TextArea, Button, Intent } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { useGlobalState } from "../../../contexts/GlobalState"; // Assuming this is the correct path

interface TextEntryProps {
  onSubmit: (message: string) => void;
}

const TextEntry: React.FC<TextEntryProps> = ({ onSubmit }) => {
	const [message, setMessage] = useState("");
	const [renderKey, setRenderKey] = useState(0);  // State variable for re-render
	const { darkMode } = useGlobalState();

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
	};

	const handleSubmit = () => {
		if (message.trim()) {
			onSubmit(message);
			setMessage("");  // Clear the input after sending

			// Update renderKey to force re-render
			setRenderKey(prevKey => prevKey + 1);
		}
	};

	const darkModeStyles = darkMode ? {
		backgroundColor: "#333",
		color: "#EEE",
		"::placeholder": {
			color: "#777"
		}
	} : {};

	return (
		<div className="relative flex items-end">
			<TextArea
				value={message}
				onChange={handleInputChange}
				growVertically={true}
				placeholder="Ask Samurai a question..."
				onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
				fill={true}
				style={{ ...darkModeStyles, resize: "none", paddingRight: "40px" }}
				intent={"none"}
			/>
			<Button
				icon="arrow-right"
				intent={Intent.NONE}
				onClick={handleSubmit}
				style={{ position: "absolute", right: "5px", bottom: "5px" }}
			/>
		</div>
	);
};

export default TextEntry;
