import React from "react";

import "./InputOption.css";

const InputOption = ({ title, Icon, color }) => {
	return (
		<div className="inputOption" style={{ color: color }}>
			<Icon  />
			<h4>{title}</h4>
		</div>
	);
};

export default InputOption;
