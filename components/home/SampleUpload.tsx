import React from "react";
import { Card, Icon, Elevation } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

interface FileCardProps {
    text: string;
    onClick?: () => void;
}

const SampleUpload: React.FC<FileCardProps> = ({ text, onClick }) => {
	return (
		<Card interactive={true} elevation={Elevation.TWO} onClick={onClick} className="flex flex-col items-center justify-center p-8 m-12 w-60">
			<Icon icon={IconNames.DOCUMENT} iconSize={40} className="mb-4" />
			<div className="text-center">
				{text}
			</div>
		</Card>
	);
};

export default SampleUpload;