import React from "react";

import "./Backdrop.css";

export default function Backdrop(props) {
	return props.show ? (
		<div className="Backdrop" onClick={props.clicked}></div>
	) : null;
}
