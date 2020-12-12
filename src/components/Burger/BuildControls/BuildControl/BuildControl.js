import React from "react";

import "./BuildControl.css";

export default function BuildControl(props) {
	return (
		<div className="BuildControl">
			<div className="Label">{props.label}</div>
			<button className="Less">Less</button>
			<button className="More" onClick={props.added}>
				More
			</button>
		</div>
	);
}
