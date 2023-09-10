import React, { useCallback } from "react";
import { FileInput } from "@blueprintjs/core";

const UserUpload: React.FC = () => {
	const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
        
		if (file) {
			console.log(file);
            
			// Process the CSV file
			// ...
		}
	}, []);

	return (
		<FileInput 
			text="CSV of your spending..."
			buttonText="Upload"
			onInputChange={handleFileChange}
			inputProps={{ accept: ".csv", style: { width: "300px", fontSize: "16px" } }}
            
		/>
	);
};

export default UserUpload;
