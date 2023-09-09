import React from "react";
import { useGlobalState } from "../../../contexts/GlobalState";
import { Icon } from "@blueprintjs/core";

interface MessageProps {
  text: string;
  sender: Sender;
}

enum Sender {
  ADVISOR = "advisor",
  USER = "user",
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
	const { darkMode } = useGlobalState();

	// Decide the classes based on sender and dark mode
	const messageClass =
		sender === Sender.USER
			? darkMode ? "bg-gray-700 text-white relative" : "bg-white text-gray-900 relative"
			: darkMode ? "bg-gray-800 text-white relative" : "bg-gray-200 text-gray-900 relative";

	const indicatorIcon = sender === Sender.USER ? "user" : "people";

	return (
		<div className={`p-4 m-1 rounded ${messageClass}`}>
			{text}
			<span className="absolute top-1 right-3">
				<Icon icon={indicatorIcon} className="bp3-icon-sm" />
			</span>
		</div>
	);
};

export default Message;
