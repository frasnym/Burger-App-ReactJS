import React from "react";

import "./DrawerToggle.css";

export default function DrawerToggle(props) {
	return (
		<div className="DrawerToggle" onClick={props.clicked}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
