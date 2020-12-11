import React from "react";

import "./Layout.css";

export default function Layout(props) {
	return (
		// Auxiliary wraping components
		<>
			<div>Toolbar, SideDrawer, Backdrop</div>
			<main className="content">{props.children}</main>
		</>
	);
}
