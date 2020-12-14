import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import "./Layout.css";

export default function Layout(props) {
	return (
		// Auxiliary wraping components
		<>
			<Toolbar />
			<main className="content">{props.children}</main>
		</>
	);
}
